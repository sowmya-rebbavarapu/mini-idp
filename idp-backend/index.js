
const validateRepo =
  require("../governance/validateRepo");

const validateNaming =
  require("../governance/validateNaming");

const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

/* ===========================
   📄 Deployment Logs
=========================== */

let deploymentLogs = [];

/* ===========================
   📝 Logger Function
=========================== */

function addLog(message) {

  console.log(message);

  deploymentLogs.push(message);

  // Keep only latest 100 logs
  if (deploymentLogs.length > 100) {

    deploymentLogs.shift();
  }
}

app.use(cors());
app.use(express.json());

addLog("🚀 Backend Started");

/* ===========================
   🧪 Health Check
=========================== */

app.get("/", (req, res) => {

  res.send("Backend running 🚀");
});

/* ===========================
   📄 Logs API
=========================== */

app.get("/logs", (req, res) => {

  res.send(deploymentLogs);
});

/* ===========================
   ☁️ Create EC2
=========================== */

app.post("/create-ec2", (req, res) => {

  addLog("☁️ Running Terraform...");

  exec(
    "cd ../infra/ec2 && terraform init && terraform apply -auto-approve -lock=false",

    (error, stdout, stderr) => {

      if (error) {

        addLog(
          `❌ Terraform Error: ${error.message}`
        );

        return res
          .status(500)
          .send("Terraform failed ❌");
      }

      addLog(
        "✅ Terraform Apply Done"
      );

      /* ===========================
         🌐 Fetch Public IP
      =========================== */

      exec(
        "cd ../infra/ec2 && terraform output public_ip",

        (err, ip) => {

          if (err) {

            addLog(
              `❌ Output Error: ${err.message}`
            );

            return res.send(
              "EC2 created but IP not fetched ❌"
            );
          }

          const cleanIP =
            ip.replace(/"/g, "").trim();

          addLog(
            `🌐 EC2 Public IP: ${cleanIP}`
          );

          res.send(cleanIP);
        }
      );
    }
  );
});

/* ===========================
   🚀 Deploy App
=========================== */

app.post("/deploy", (req, res) => {

  const { repoUrl, ip } = req.body;

  addLog("🚀 Deploy triggered");

  addLog(`📦 Repo: ${repoUrl}`);

  addLog(`🌐 EC2 IP: ${ip}`);

  /* ===========================
     🛡️ GOVERNANCE VALIDATION
  =========================== */

  // ✅ Validate GitHub Repo
  const repoValidation =
    validateRepo(repoUrl);

  if (!repoValidation.valid) {

    addLog(
      `❌ ${repoValidation.message}`
    );

    return res.status(400).send({
      success: false,
      message: repoValidation.message
    });
  }

  // ✅ Validate Naming
  const namingValidation =
    validateNaming(repoUrl);

  if (!namingValidation.valid) {

    addLog(
      `❌ ${namingValidation.message}`
    );

    return res.status(400).send({
      success: false,
      message: namingValidation.message
    });
  }

  addLog(
    "✅ Governance checks passed"
  );

  /* ===========================
     📝 Audit Logging
  =========================== */

  if (!fs.existsSync("logs")) {

    fs.mkdirSync("logs");
  }

  fs.appendFileSync(
    "logs/deployments.log",

    `\n${new Date().toISOString()} | Repo: ${repoUrl} | EC2: ${ip}`
  );

  // PEM File Path
  const pemPath = path.join(
    __dirname,
    "../infra/ec2/pemfile.pem"
  );

  /* ===========================
     🚀 CLEAN DEPLOYMENT LOGS
  =========================== */

  addLog("📦 Cloning repository...");

  addLog("🐳 Building Docker image...");

  addLog(
    "🚀 Starting application container..."
  );

  addLog(
    "📊 Configuring monitoring stack..."
  );

  addLog("📈 Starting Prometheus...");

  addLog("📊 Starting Grafana...");

  /* ===========================
     🚀 DEPLOYMENT COMMAND
  =========================== */

  const command =
    `ssh -o StrictHostKeyChecking=no -i "${pemPath}" ec2-user@${ip} ` +

    `"sudo systemctl start docker && ` +

    `sudo systemctl enable docker && ` +

    `rm -rf app && ` +

    `git clone ${repoUrl} app && ` +

    `cd app && ` +

    `if [ ! -f Dockerfile ]; then ` +
    `echo 'Dockerfile missing'; exit 1; fi && ` +

    `sudo docker build -t idp-app . && ` +

    `sudo docker stop idp-container || true && ` +
    `sudo docker rm idp-container || true && ` +

    `sudo docker run -d --restart unless-stopped -p 3000:3000 --name idp-container idp-app && ` +

    `sudo docker stop node-exporter || true && ` +
    `sudo docker rm node-exporter || true && ` +

    `sudo docker run -d -p 9100:9100 --name node-exporter prom/node-exporter && ` +

    `mkdir -p /home/ec2-user/monitoring && ` +

    `printf 'global:\\n  scrape_interval: 15s\\n\\nscrape_configs:\\n  - job_name: "prometheus"\\n    static_configs:\\n      - targets: ["localhost:9090"]\\n\\n  - job_name: "app-server"\\n    static_configs:\\n      - targets: ["${ip}:9100"]\\n' > /home/ec2-user/monitoring/prometheus.yml && ` +

    `sudo docker stop prometheus || true && ` +
    `sudo docker rm prometheus || true && ` +

    `sudo docker run -d ` +
    `-p 9090:9090 ` +
    `--name prometheus ` +
    `-v /home/ec2-user/monitoring/prometheus.yml:/etc/prometheus/prometheus.yml ` +
    `prom/prometheus && ` +

    `sudo docker stop grafana || true && ` +
    `sudo docker rm grafana || true && ` +

    `sudo docker run -d -p 3001:3000 --name grafana grafana/grafana"`;

  addLog(
    "📄 Running Deployment Command..."
  );

  exec(command, (error, stdout, stderr) => {

    if (error) {

      addLog("❌ Deployment Failed");

      addLog(
        `❌ ${error.message}`
      );

      return res.status(500).send({
        success: false,
        message: "Deployment failed ❌",
        error: stderr || error.message
      });
    }

    addLog(
      "✅ Full Deployment Success"
    );

    addLog(
      `🚀 Application URL → http://${ip}:3000`
    );

    addLog(
      `📊 Grafana URL → http://${ip}:3001`
    );

    addLog(
      `📈 Prometheus URL → http://${ip}:9090`
    );

    res.send({
      success: true,

      message:
        `🚀 App: http://${ip}:3000

📊 Grafana: http://${ip}:3001

📈 Prometheus: http://${ip}:9090`
    });
  });
});

/* ===========================
   ❌ Unknown Routes
=========================== */

app.use((req, res) => {

  res
    .status(404)
    .send("Route not found ❌");
});

/* ===========================
   🚀 Start Server
=========================== */

app.listen(5000, () => {

  addLog(
    "🚀 Server running on port 5000"
  );
});

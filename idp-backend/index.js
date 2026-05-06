const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

/* ===========================
   🧪 Health Check
=========================== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});
app.post("/deploy", (req, res) => {
  console.log("🚀 Deploy triggered");

  const ip = "65.1.1.20";
  const repo = "https://github.com/YOUR_USERNAME/YOUR_NODE_APP_REPO.git";

  const command = `
  ssh -o StrictHostKeyChecking=no -i ../infra/pemfile.pem ec2-user@${ip} "
    rm -rf app &&
    git clone ${repo} app &&
    cd app &&
    docker build -t idp-app . &&
    docker stop idp-container || true &&
    docker rm idp-container || true &&
    docker run -d -p 3000:3000 --name idp-container idp-app
  "
  `;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Deploy error:", error.message);
      return res.send("Deployment failed ❌");
    }

    res.send(`App deployed at http://${ip}:3000 🚀`);
  });
});



/* ===========================
   ☁️ EC2 via Terraform
=========================== */
app.post("/create-ec2", (req, res) => {
  console.log("Running Terraform...");

  // Step 1: Apply Terraform
  exec(
    "cd ../infra && terraform apply -auto-approve -lock=false",
    (error, stdout, stderr) => {

      if (error) {
        console.error("❌ Terraform Error:", error.message);
        return res.status(500).send("Terraform failed ❌");
      }

      console.log("✅ Apply done");

      // Step 2: Fetch public IP
      exec("cd ../infra && terraform output public_ip", (err, ip) => {

        if (err) {
          console.error("❌ Output error:", err.message);
          return res.send("EC2 created but IP not fetched");
        }

        // Clean output (removes quotes/newlines)
        const cleanIP = ip.replace(/"/g, "").trim();

        res.send(cleanIP);
      });
    }
  );
});
/* ===========================
   📦 S3 (placeholder for now)
=========================== */
app.post("/create-s3", (req, res) => {
  console.log("S3 bucket creation triggered");

  // Later: integrate AWS SDK
  res.send("S3 bucket created (demo) 📦");
});

/* ===========================
   📊 Logs (Docker)
=========================== */
app.get("/logs", (req, res) => {
  exec("docker ps", (error, stdout, stderr) => {

    if (error) {
      console.error("❌ Docker Error:", error.message);
      return res.status(500).send("Error fetching logs ❌");
    }

    res.send(stdout);
  });
});

/* ===========================
   ❌ Catch Unknown Routes
=========================== */
app.use((req, res) => {
  console.log("Unknown route:", req.method, req.url);
  res.status(404).send("Route not found ❌");
});

/* ===========================
   🚀 Start Server
=========================== */
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
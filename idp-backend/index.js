// // const express = require("express");
// // const cors = require("cors");
// // const { exec } = require("child_process");
// // const path = require("path");

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // /* ===========================
// //    🧪 Health Check
// // =========================== */
// // app.get("/", (req, res) => {

// //   res.send("Backend running 🚀");
// // });

// // /* ===========================
// //    ☁️ Create EC2
// // =========================== */
// // app.post("/create-ec2", (req, res) => {

// //   console.log("☁️ Running Terraform...");

// //   exec(
// //     "cd ../infra/ec2 && terraform init && terraform apply -auto-approve -lock=false",
// //     (error, stdout, stderr) => {

// //       console.log(stdout);

// //       if (stderr) {
// //         console.log(stderr);
// //       }

// //       if (error) {

// //         console.error(
// //           "❌ Terraform Error:",
// //           error.message
// //         );

// //         return res
// //           .status(500)
// //           .send("Terraform failed ❌");
// //       }

// //       console.log(
// //         "✅ Terraform Apply Done"
// //       );

// //       // Fetch EC2 Public IP
// //       exec(
// //         "cd ../infra/ec2 && terraform output public_ip",
// //         (err, ip) => {

// //           if (err) {

// //             console.error(
// //               "❌ Output Error:",
// //               err.message
// //             );

// //             return res.send(
// //               "EC2 created but IP not fetched ❌"
// //             );
// //           }

// //           // Clean output
// //           const cleanIP =
// //             ip.replace(/"/g, "").trim();

// //           console.log(
// //             "🌐 EC2 Public IP:",
// //             cleanIP
// //           );

// //           res.send(cleanIP);
// //         }
// //       );
// //     }
// //   );
// // });

// // /* ===========================
// //    🚀 Deploy App
// // =========================== */
// // app.post("/deploy", (req, res) => {

// //   const { repoUrl, ip } = req.body;

// //   console.log("🚀 Deploy triggered");

// //   console.log("📦 Repo:", repoUrl);

// //   console.log("🌐 EC2 IP:", ip);

// //   // PEM file path
// //   const pemPath = path.join(
// //     __dirname,
// //     "../infra/ec2/pemfile.pem"
// //   );

// //   // Simple single-line SSH command
// //   const command =
// //     `ssh -o StrictHostKeyChecking=no -i "${pemPath}" ec2-user@${ip} ` +
// //     `"rm -rf app && ` +
// //     `git clone ${repoUrl} app && ` +
// //     `cd app && ` +
// //     `sudo docker build -t idp-app . && ` +
// //     `sudo docker stop idp-container || true && ` +
// //     `sudo docker rm idp-container || true && ` +
// //     `sudo docker run -d --restart unless-stopped -p 3000:3000 --name idp-container idp-app"`;

// //   console.log("📄 Running Command:\n", command);

// //   exec(command, (error, stdout, stderr) => {

// //     console.log("📄 STDOUT:\n", stdout);

// //     console.log("⚠️ STDERR:\n", stderr);

// //     if (error) {

// //       console.error(
// //         "❌ Deployment Failed:",
// //         error.message
// //       );

// //       return res.status(500).send({
// //         success: false,
// //         message: "Deployment failed ❌",
// //         error: stderr || error.message
// //       });
// //     }

// //     console.log("✅ Deployment Success");

// //     res.send({
// //       success: true,
// //       message:
// //         `🚀 App deployed at http://${ip}:3000`
// //     });
// //   });
// // });

// // /* ===========================
// //    ❌ Unknown Routes
// // =========================== */
// // app.use((req, res) => {

// //   res
// //     .status(404)
// //     .send("Route not found ❌");
// // });

// // /* ===========================
// //    🚀 Start Server
// // =========================== */
// // app.listen(5000, () => {

// //   console.log(
// //     "Server running on port 5000 🚀"
// //   );
// // });
// const validateRepo =
//   require("./governance/validateRepo");
// const validateNaming =
//   require("./governance/validateNaming");
// const express = require("express");
// const cors = require("cors");
// const { exec } = require("child_process");
// const path = require("path");

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ===========================
//    🧪 Health Check
// =========================== */
// app.get("/", (req, res) => {

//   res.send("Backend running 🚀");
// });

// /* ===========================
//    ☁️ Create EC2
// =========================== */
// app.post("/create-ec2", (req, res) => {

//   console.log("☁️ Running Terraform...");

//   exec(
//     "cd ../infra/ec2 && terraform init && terraform apply -auto-approve -lock=false",
//     (error, stdout, stderr) => {

//       console.log(stdout);

//       if (stderr) {
//         console.log(stderr);
//       }

//       if (error) {

//         console.error(
//           "❌ Terraform Error:",
//           error.message
//         );

//         return res
//           .status(500)
//           .send("Terraform failed ❌");
//       }

//       console.log(
//         "✅ Terraform Apply Done"
//       );

//       // Fetch Public IP
//       exec(
//         "cd ../infra/ec2 && terraform output public_ip",
//         (err, ip) => {

//           if (err) {

//             console.error(
//               "❌ Output Error:",
//               err.message
//             );

//             return res.send(
//               "EC2 created but IP not fetched ❌"
//             );
//           }

//           const cleanIP =
//             ip.replace(/"/g, "").trim();

//           console.log(
//             "🌐 EC2 Public IP:",
//             cleanIP
//           );

//           res.send(cleanIP);
//         }
//       );
//     }
//   );
// });

// /* ===========================
//    🚀 Deploy App
// =========================== */
// app.post("/deploy", (req, res) => {

//   const { repoUrl, ip } = req.body;

//   console.log("🚀 Deploy triggered");

//   console.log("📦 Repo:", repoUrl);

//   console.log("🌐 EC2 IP:", ip);

//   // PEM File Path
//   const pemPath = path.join(
//     __dirname,
//     "../infra/ec2/pemfile.pem"
//   );

//   /* ===========================
//      🚀 FULL AUTOMATION
//   =========================== */

//   const command =
//     `ssh -o StrictHostKeyChecking=no -i "${pemPath}" ec2-user@${ip} ` +
//     `"sudo systemctl start docker && ` +
//     `sudo systemctl enable docker && ` +

//     `rm -rf app && ` +

//     `git clone ${repoUrl} app && ` +

//     `cd app && ` +

//     `sudo docker build -t idp-app . && ` +

//     `sudo docker stop idp-container || true && ` +
//     `sudo docker rm idp-container || true && ` +

//     `sudo docker run -d --restart unless-stopped -p 3000:3000 --name idp-container idp-app && ` +

//     `sudo docker stop node-exporter || true && ` +
//     `sudo docker rm node-exporter || true && ` +

//     `sudo docker run -d -p 9100:9100 --name node-exporter prom/node-exporter && ` +

//     `mkdir -p monitoring && ` +

//     `printf 'global:\\n  scrape_interval: 15s\\n\\nscrape_configs:\\n  - job_name: "prometheus"\\n    static_configs:\\n      - targets: ["localhost:9090"]\\n\\n  - job_name: "node-exporter"\\n    static_configs:\\n      - targets: ["localhost:9100"]\\n' > monitoring/prometheus.yml && ` +

//     `sudo docker stop prometheus || true && ` +
//     `sudo docker rm prometheus || true && ` +

//     `sudo docker run -d ` +
//     `-p 9090:9090 ` +
//     `--name prometheus ` +
//     `-v /home/ec2-user/monitoring/prometheus.yml:/etc/prometheus/prometheus.yml ` +
//     `prom/prometheus && ` +

//     `sudo docker stop grafana || true && ` +
//     `sudo docker rm grafana || true && ` +

//     `sudo docker run -d -p 3001:3000 --name grafana grafana/grafana"`;

//   console.log("📄 Running Command:\n", command);

//   exec(command, (error, stdout, stderr) => {

//     console.log("📄 STDOUT:\n", stdout);

//     console.log("⚠️ STDERR:\n", stderr);

//     if (error) {

//       console.error(
//         "❌ Deployment Failed:",
//         error.message
//       );

//       return res.status(500).send({
//         success: false,
//         message: "Deployment failed ❌",
//         error: stderr || error.message
//       });
//     }

//     console.log(
//       "✅ Full Deployment Success"
//     );

//     res.send({
//       success: true,
//       message:
//         `🚀 App: http://${ip}:3000

// 📊 Grafana: http://${ip}:3001

// 📈 Prometheus: http://${ip}:9090`
//     });
//   });
// });

// /* ===========================
//    ❌ Unknown Routes
// =========================== */
// app.use((req, res) => {

//   res
//     .status(404)
//     .send("Route not found ❌");
// });

// /* ===========================
//    🚀 Start Server
// =========================== */
// app.listen(5000, () => {

//   console.log(
//     "Server running on port 5000 🚀"
//   );
// });
const validateRepo =
  require("./governance/validateRepo");

const validateNaming =
  require("./governance/validateNaming");

const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

/* ===========================
   🧪 Health Check
=========================== */
app.get("/", (req, res) => {

  res.send("Backend running 🚀");
});

/* ===========================
   ☁️ Create EC2
=========================== */
app.post("/create-ec2", (req, res) => {

  console.log("☁️ Running Terraform...");

  exec(
    "cd ../infra/ec2 && terraform init && terraform apply -auto-approve -lock=false",
    (error, stdout, stderr) => {

      console.log(stdout);

      if (stderr) {
        console.log(stderr);
      }

      if (error) {

        console.error(
          "❌ Terraform Error:",
          error.message
        );

        return res
          .status(500)
          .send("Terraform failed ❌");
      }

      console.log(
        "✅ Terraform Apply Done"
      );

      // Fetch Public IP
      exec(
        "cd ../infra/ec2 && terraform output public_ip",
        (err, ip) => {

          if (err) {

            console.error(
              "❌ Output Error:",
              err.message
            );

            return res.send(
              "EC2 created but IP not fetched ❌"
            );
          }

          const cleanIP =
            ip.replace(/"/g, "").trim();

          console.log(
            "🌐 EC2 Public IP:",
            cleanIP
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

  console.log("🚀 Deploy triggered");

  console.log("📦 Repo:", repoUrl);

  console.log("🌐 EC2 IP:", ip);

  /* ===========================
     🛡️ GOVERNANCE VALIDATION
  =========================== */

  // ✅ Repo Validation
  const repoValidation =
    validateRepo(repoUrl);

  if (!repoValidation.valid) {

    return res.status(400).send({
      success: false,
      message: repoValidation.message
    });
  }

  // ✅ Naming Validation
  const namingValidation =
    validateNaming(repoUrl);

  if (!namingValidation.valid) {

    return res.status(400).send({
      success: false,
      message: namingValidation.message
    });
  }

  // ✅ Deployment Audit Logging
  if (!fs.existsSync("logs")) {

    fs.mkdirSync("logs");
  }

  fs.appendFileSync(
    "logs/deployments.log",
    `\n${new Date().toISOString()} | Repo: ${repoUrl} | Target EC2: ${ip}`
  );

  console.log(
    "✅ Governance checks passed"
  );

  // PEM File Path
  const pemPath = path.join(
    __dirname,
    "../infra/ec2/pemfile.pem"
  );

  /* ===========================
     🚀 FULL AUTOMATION
  =========================== */

  const command =
    `ssh -o StrictHostKeyChecking=no -i "${pemPath}" ec2-user@${ip} ` +
    `"sudo systemctl start docker && ` +
    `sudo systemctl enable docker && ` +

    `rm -rf app && ` +

    `git clone ${repoUrl} app && ` +

    `cd app && ` +

    // ✅ Dockerfile Governance
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

  console.log("📄 Running Command:\n", command);

  exec(command, (error, stdout, stderr) => {

    console.log("📄 STDOUT:\n", stdout);

    console.log("⚠️ STDERR:\n", stderr);

    if (error) {

      console.error(
        "❌ Deployment Failed:",
        error.message
      );

      return res.status(500).send({
        success: false,
        message: "Deployment failed ❌",
        error: stderr || error.message
      });
    }

    console.log(
      "✅ Full Deployment Success"
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

  console.log(
    "Server running on port 5000 🚀"
  );
});
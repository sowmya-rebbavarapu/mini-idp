

import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

function Dashboard() {

  // Store EC2 IP
  const [ec2Ip, setEc2Ip] = useState("");

  // Store GitHub Repo URL
  const [repoUrl, setRepoUrl] = useState("");

  // Status message
  const [message, setMessage] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Backend Logs
  const [logs, setLogs] = useState([]);

  /* ===========================
     📄 Fetch Logs
  =========================== */
  useEffect(() => {

    const interval = setInterval(async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/logs"
        );

        setLogs(res.data);

      } catch (err) {

        console.log(err);
      }

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  /* ===========================
     ☁️ Create EC2
  =========================== */
  const handleEC2 = async () => {

    try {

      setLoading(true);

      setMessage(
        "⚙️ Provisioning EC2..."
      );

      const res = await axios.post(
        "http://localhost:5000/create-ec2"
      );

      setEc2Ip(res.data);

      setMessage(
        `✅ EC2 Created Successfully → ${res.data}`
      );

    } catch (err) {

      setMessage(
        "❌ EC2 creation failed"
      );
    }

    setLoading(false);
  };

  /* ===========================
     🚀 Deploy App
  =========================== */
  const handleDeploy = async () => {

    try {

      setLoading(true);

      setMessage(
        "🚀 Deploying application..."
      );

      const res = await axios.post(
        "http://localhost:5000/deploy",
        {
          repoUrl,
          ip: ec2Ip
        }
      );

      setMessage(
        res.data.message
      );

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "❌ Deployment failed"
      );
    }

    setLoading(false);
  };

  /* ===========================
     📊 Monitoring
  =========================== */
  const handleMonitoring = () => {

    if (!ec2Ip) {

      return setMessage(
        "❌ Create EC2 first"
      );
    }

    window.open(
      `http://${ec2Ip}:3001`,
      "_blank"
    );
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #141e30, #243b55)",
        padding: "40px",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px"
          }}
        >
          🚀 Mini Internal Developer Platform
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#d1d5db"
          }}
        >
          Self-Service Infrastructure &
          Deployment Platform
        </p>

      </div>

      {/* Main Card */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.3)"
        }}
      >

        <h2
          style={{
            color: "#111827",
            marginBottom: "20px"
          }}
        >
          Deployment Configuration
        </h2>

        {/* Inputs */}
        <input
          type="text"
          placeholder="GitHub Repository URL"
          value={repoUrl}
          onChange={(e) =>
            setRepoUrl(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="EC2 Public IP"
          value={ec2Ip}
          onChange={(e) =>
            setEc2Ip(e.target.value)
          }
          style={inputStyle}
        />

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >

          <Card
            title={
              loading
                ? "⏳ Processing..."
                : "☁️ Provision EC2"
            }
            onClick={handleEC2}
          />

          <Card
            title={
              loading
                ? "⏳ Deploying..."
                : "🚀 Deploy App"
            }
            onClick={handleDeploy}
          />

          <Card
            title="📊 Monitoring"
            onClick={handleMonitoring}
          />

        </div>

        {/* Status */}
        {message && (

          <div
            style={{
              marginTop: "30px",
              background: "#f3f4f6",
              padding: "20px",
              borderRadius: "12px",
              color: "#111827",
              whiteSpace: "pre-line"
            }}
          >
            {message}
          </div>
        )}

        {/* Links Table */}
        {ec2Ip && (

          <div
            style={{
              marginTop: "35px"
            }}
          >

            <h3
              style={{
                color: "#111827",
                marginBottom: "15px"
              }}
            >
              🌐 Platform Access Links
            </h3>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.1)"
              }}
            >

              <thead>

                <tr
                  style={{
                    background: "#111827",
                    color: "white"
                  }}
                >

                  <th style={tableHeader}>
                    Service
                  </th>

                  <th style={tableHeader}>
                    URL
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td style={tableCell}>
                    🚀 Application
                  </td>

                  <td style={tableCell}>

                    <a
                      href={`http://${ec2Ip}:3000`}
                      target="_blank"
                      rel="noreferrer"
                      style={tableLink}
                    >
                      http://{ec2Ip}:3000
                    </a>

                  </td>

                </tr>

                <tr>

                  <td style={tableCell}>
                    📊 Grafana
                  </td>

                  <td style={tableCell}>

                    <a
                      href={`http://${ec2Ip}:3001`}
                      target="_blank"
                      rel="noreferrer"
                      style={tableLink}
                    >
                      http://{ec2Ip}:3001
                    </a>

                  </td>

                </tr>

                <tr>

                  <td style={tableCell}>
                    📈 Prometheus
                  </td>

                  <td style={tableCell}>

                    <a
                      href={`http://${ec2Ip}:9090`}
                      target="_blank"
                      rel="noreferrer"
                      style={tableLink}
                    >
                      http://{ec2Ip}:9090
                    </a>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>
        )}

        {/* Terminal Logs */}
        <div
          style={{
            marginTop: "40px"
          }}
        >

          <h3
            style={{
              color: "#111827"
            }}
          >
            💻 Deployment Logs
          </h3>

          <div
            style={{
              background: "#111827",
              color: "#10b981",
              padding: "20px",
              borderRadius: "12px",
              height: "300px",
              overflowY: "scroll",
              fontFamily: "monospace",
              fontSize: "14px",
              textAlign: "left"
            }}
          >

            {logs.map((log, index) => (

              <div key={index}>
                {log}
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

/* ===========================
   🎨 Styles
=========================== */

const inputStyle = {

  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "16px"
};

const tableHeader = {

  padding: "14px",
  textAlign: "left"
};

const tableCell = {

  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
  color: "#111827",
  background: "white"
};

const tableLink = {

  color: "#2563eb",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Dashboard;

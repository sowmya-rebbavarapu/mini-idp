import { useState } from "react";
import Card from "../components/Card";
import axios from "axios";

function Dashboard() {

  // Store EC2 IP
  const [ec2Ip, setEc2Ip] = useState("");

  // Store GitHub Repo URL
  const [repoUrl, setRepoUrl] = useState("");

  /* ===========================
     ☁️ Create EC2
  =========================== */
  const handleEC2 = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/create-ec2"
      );

      setEc2Ip(res.data);

      alert(
        "✅ EC2 Created: " + res.data
      );

    } catch (err) {

      alert("❌ EC2 creation failed");
    }
  };

  /* ===========================
     🚀 Deploy App
  =========================== */
  const handleDeploy = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/deploy",
        {
          repoUrl,
          ip: ec2Ip
        }
      );

      alert(res.data.message);

    } catch (err) {

      alert("❌ Deployment failed");
    }
  };

  /* ===========================
     📊 Monitoring
  =========================== */
  const handleMonitoring = () => {

    if (!ec2Ip) {

      return alert(
        "❌ Create EC2 first"
      );
    }

    window.open(
      `http://${ec2Ip}:3001`,
      "_blank"
    );
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Mini IDP Portal 🚀</h1>

      {/* Deploy Form */}
      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px"
        }}
      >

        <input
          type="text"
          placeholder="GitHub Repo URL"
          value={repoUrl}
          onChange={(e) =>
            setRepoUrl(e.target.value)
          }
          style={{
            width: "400px",
            padding: "10px",
            marginRight: "10px"
          }}
        />

        <input
          type="text"
          placeholder="EC2 Public IP"
          value={ec2Ip}
          onChange={(e) =>
            setEc2Ip(e.target.value)
          }
          style={{
            width: "250px",
            padding: "10px"
          }}
        />

      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}
      >

        <Card
          title="☁️ Provision EC2"
          onClick={handleEC2}
        />

        <Card
          title="🚀 Deploy App"
          onClick={handleDeploy}
        />

        <Card
          title="📊 Monitoring"
          onClick={handleMonitoring}
        />

      </div>

    </div>
  );
}

export default Dashboard;
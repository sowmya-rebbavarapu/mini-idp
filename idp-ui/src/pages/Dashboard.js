import Card from "../components/Card";
import axios from "axios";

function Dashboard() {

  const handleDeploy = async () => {
    await axios.post("http://localhost:5000/deploy");
    alert("Deployment triggered!");
  };

  
const handleEC2 = async () => {
  try {
    const res = await axios.post("http://localhost:5000/create-ec2");
    alert("EC2 Running at: http://" + res.data);
  } catch (err) {
    alert("Error creating EC2");
  }
};

  const handleS3 = async () => {
    await axios.post("http://localhost:5000/create-s3");
    alert("S3 bucket created!");
  };

  const handleLogs = async () => {
    const res = await axios.get("http://localhost:5000/logs");
    alert(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini IDP Portal 🚀</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px"
      }}>
        <Card title="🚀 Deploy App" onClick={handleDeploy} />
        <Card title="☁️ Provision EC2" onClick={handleEC2} />
        <Card title="📦 Create S3" onClick={handleS3} />
        <Card title="📊 View Logs" onClick={handleLogs} />
        <Card title="📁 Templates" />
        <Card title="⚙️ Governance" />
      </div>
    </div>
  );
}

export default Dashboard;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("CI/CD Successfully Working 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
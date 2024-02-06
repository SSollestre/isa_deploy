const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const httpProxy = require("http-proxy");
const { spawn } = require("child_process");

// Home
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath);
});

// Lab 0 (lab_0/index.html)
app.use("/COMP4537/labs/0", express.static(path.join(__dirname, "lab_0")));
app.get("/COMP4537/labs/0", (req, res) => {
  const filePath = path.join(__dirname, "lab_0", "index.html");
  res.sendFile(filePath);
});

// Lab 1 (lab_1/index.html)
app.use("/COMP4537/labs/1", express.static(path.join(__dirname, "lab_1")));
app.get("/COMP4537/labs/1", (req, res) => {
  const filePath = path.join(__dirname, "lab_1", "index.html");
  res.sendFile(filePath);
});

// Lab 3 (/lab_3/server.js)
// Define the command to start the inner server
const serverPath = path.join(__dirname, "lab_3", "server.js");
const innerServerProcess = spawn("node", [serverPath]);

innerServerProcess.stdout.on("data", (data) => {
  console.log(`Inner Server Output: ${data}`);
});

innerServerProcess.stderr.on("data", (data) => {
  console.error(`Inner Server Error: ${data}`);
});

innerServerProcess.on("close", (code) => {
  console.log(`Inner Server exited with code ${code}`);
});

// Create an HTTP proxy instance
const proxy = httpProxy.createProxyServer();

app.use("/COMP4537/labs/3", express.static(path.join(__dirname, "lab_3")));
app.get("/COMP4537/labs/3/getDate/", (req, res) => {
  // Proxy the request to the inner server
  proxy.web(req, res, {
    target: "http://localhost:8000", // Target URL of the inner server
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}. http://localhost:${port}/`);
});

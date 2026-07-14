const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    project: "Smart Sensory Assist Shoe",
    version: "1.0.0",
    status: "Backend Running Successfully 🚀"
  });
});

module.exports = app;
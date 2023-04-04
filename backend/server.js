const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// First route
app.get("/api/goals", (req, res) => {
  res.json({ message: "Get Goals" });
});

app.listen(port, () => console.log(`listening on port ${port}`));

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/dashboard", (req, res) => {
  res.json({
    mentions: 12540,
    engagement: 28450,
    positive: 62,
    neutral: 25,
    negative: 13
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
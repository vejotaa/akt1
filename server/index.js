const express = require("express");
const port = 3001;
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/data", (req, res) => {
  const now = new Date();
  res.json({
    dia: now.getDate(),
    mes: now.getMonth() + 1,
  });
});

app.listen(port, () => {
  console.log("servidor rodando na porta: " + port);
});

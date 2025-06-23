const express = require("express");
const port = 3001;
const app = express();
const cors = require("cors");
const fs = require("fs");
const { FILE } = require("dns");

app.use(cors());
app.use(express.json());

const FILE_PATH = __dirname + "/notas.json";

function readNotes() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

function saveNotes(notes) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
}

//all
app.get("/all", (req, res) => {
  const notas = readNotes();

  res.json(notas);
});

//one
app.get("/all/:id", (req, res) => {
  const notas = readNotes();
  const nota = notas.find((n) => n.id === req.params.id);
  if (nota) {
    res.json(nota);
  } else {
    res.status(404).json({ error: "nota nao encontrada" });
  }
});

app.post("/new", (req, res) => {
  const { titulo, texto } = req.body;

  if (!titulo || !texto) {
    return res.status(400).json({ error: "Titulo e texto sao obrigatorios" });
  }
  const notas = readNotes();
  const novaNota = {
    id: Date.now().toString(),
    titulo,
    texto,
  };

  notas.push(notaNota);
  saveNotas(notas);

  res.status(201).json(notaNota);
});

// 🔹 PUT /update/:id → atualiza uma nota
app.put("/update/:id", (req, res) => {
  const { titulo, texto } = req.body;
  const notas = readNotes();
  const index = notas.findIndex((n) => n.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Nota não encontrada" });
  }

  notas[index] = { ...notas[index], titulo, texto };
  saveNotes(notas);

  res.json(notas[index]);
});

// 🔹 DELETE /delete/:id → remove uma nota
app.delete("/delete/:id", (req, res) => {
  const notas = readNotes();
  const novasNotas = notas.filter((n) => n.id !== req.params.id);

  if (novasNotas.length === notas.length) {
    return res.status(404).json({ error: "Nota não encontrada" });
  }

  saveNotes(novasNotas);
  res.json({ message: "Nota removida com sucesso" });
});

app.listen(port, () => {
  console.log("servidor rodando na porta: " + port);
});

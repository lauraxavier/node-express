const express = require("express");
const fs = require("fs");

const router = express.Router();

const alunos = [
  { nome: "Pedro", matricula: "001", media: 8.5 },
  { nome: "Mallu", matricula: "002", media: 7.2 },
  { nome: "Laura", matricula: "003", media: 9.0 },
  { nome: "Bianca", matricula: "004", media: 6.5 },
  { nome: "Thomas", matricula: "005", media: 8.7 },
];

function salvar(alunos) {
  const data = JSON.stringify(alunos, null, 2);
  fs.writeFile("db.json", data, (err) => {
    if (err) {
      console.error("Erro ao salvar os dados dos alunos:", err);
    } else {
      console.log("Dados dos alunos salvos com sucesso em db.json");
    }
  });
}

router.post("/novo", (req, res) => {
  const { nome, matricula, media } = req.body;

  if (
    typeof nome !== "string" ||
    typeof matricula !== "string" ||
    typeof media !== "number"
  ) {
    return res.status(400).json({ error: "Campos inválidos" });
  }

  const matriculaExistente = alunos.find(
    (aluno) => aluno.matricula === matricula
  );
  if (matriculaExistente) {
    return res.status(400).json({ error: "Matrícula já cadastrada" });
  }

  const novoAluno = { nome, matricula, media };
  alunos.push(novoAluno);

  salvar(alunos);
  return res.status(201).json(novoAluno);
});

router.delete("/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= alunos.length) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }

  const alunoRemovido = alunos.splice(index, 1)[0];

  salvar(alunos);
  return res.status(200).json({
    message: "Aluno removido com sucesso",
    aluno: alunoRemovido,
  });
});

router.put("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  console.log(req.body);

  const { nome, media } = req.body;

  if (isNaN(index) || index < 0 || index >= alunos.length) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }

  if (nome) {
    alunos[index].nome = nome;
  }

  if (media) {
    alunos[index].media = media;
  }
  alunos[index].matricula = (index + 1).toString().padStart(3, "0");
  salvar(alunos);
  return res.status(200).json(alunos[index]);
});

module.exports = { router, alunos };
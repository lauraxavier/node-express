const express = require("express");
const app = express();
const { router, alunos } = require("./alunos.js");

app.use(express.json());

app.use("/alunos", router);

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
function filtrarPorNome(nome) {
  return alunos.filter((aluno) => aluno.nome.includes(nome));
}

function filtrarPorMedia(mediaMinima) {
  return alunos.filter((aluno) => aluno.media >= mediaMinima);
}

app.get("/alunos", (req, res) => {
  const { nome, media } = req.query;

  if (nome) {
    const alunosFiltrados = filtrarPorNome(nome);
    if (alunosFiltrados.length === 0) {
      res
        .status(404)
        .json({ message: "Nenhum aluno encontrado com o nome informado." });
    } else {
      res.json(alunosFiltrados);
    }
  } else if (media) {
    res.json(filtrarPorMedia(parseFloat(media)));
  } else {
    res.json(alunos);
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta http://localhost:3000/");
});

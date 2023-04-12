const { alunos, filtrarNome, filtrarMedia } = require("./alunos");
const express = require("express");
const app = express();

app.get("/alunos", (req, res) => {
  const nome = req.query.nome;
  const media = parseFloat(req.query.media);

  let alunosFiltrados = alunos;

  if (nome) {
    alunosFiltrados = filtrarNome(nome);
  }

  if (!isNaN(media)) {
    alunosFiltrados = filtrarMedia(media);
  }

  res.json(alunosFiltrados);
});



app.post("/alunos/novo", (req, res)=>{
    const nome = req.query.nome;
    const matricula = req.query.matricula;
    const media = parseFloat(req.query.media);
    
    if (!nome || !matricula || !media){
        return res.status(400).send("Nome, matrícula e média são campos obrigatórios!")
    }

    if(typeof media !== "number" || isNaN(media)){
        return res.status(400).send("A média deve ser um número válido!")
    }

    const novoAluno = {nome, matricula, media};
    alunos.push(novoAluno);

    res.send("Aluno adicionado com sucesso!")
    
})


app.listen(3000, () => {
  console.log("http://localhost:3000/alunos");
});
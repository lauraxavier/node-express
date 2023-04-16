const alunos = [
  { nome: "Pedro", matricula: "001", media: 8.5 },
  { nome: "Mallu", matricula: "002", media: 7.2 },
  { nome: "Laura", matricula: "003", media: 9.0 },
  { nome: "Bianca", matricula: "004", media: 6.5 },
  { nome: "Thomas", matricula: "005", media: 8.7 },
];

const filtrarNome = (nome) => {
  return alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(nome.toLowerCase())
  );
};

const filtrarMedia = (mediaAluno) => {
  return alunos.filter((aluno) => aluno.media >= mediaAluno);
};

const salvarAlunos = (alunos)=> {
  const data = JSON.stringify(alunos, null, 2);
  fs.writeFile("db.json", data, (err) => {
    if (err) {
      console.error("Erro ao salvar os dados dos alunos:", err);
    } else {
      console.log("Dados dos alunos salvos com sucesso em db.json");
    }
  });
};

module.exports = {
  alunos,
  filtrarNome,
  filtrarMedia,
  salvarAlunos,
};

const Biblioteca = require("../src/Trabalho01Turma02");

test("Adicionar livro", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1
  });

  const livros = biblioteca.listarLivros();

  expect(livros.length).toStrictEqual(1);
  expect(livros[0].id).toStrictEqual(1);
});

test("Remover livro", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1
  });

  biblioteca.removerLivro(1);

  expect(biblioteca.contarLivros()).toStrictEqual(0);
});

test("Buscar livro por id", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1
  });

  const livro = biblioteca.buscarLivroPorId(1);

  expect(livro.id).toStrictEqual(1);
});

test("Buscar livro inexistente por id", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1
  });

  const livro = biblioteca.buscarLivroPorId(2);

  expect(livro).toBeUndefined();
});

test("Buscar livro por título", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    titulo: "Senhor dos Aneis"
  });

  biblioteca.adicionarLivro({
    id: 2,
    titulo: "Senhor do Tempo"
  });

  const livros = biblioteca.buscarLivroPorTitulo("Senhor");

  expect(livros.length).toStrictEqual(2);
  expect(livros[0].id).toStrictEqual(1);
});

test("Adicionar membro", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarMembro({
    id: 1
  });

  const membros = biblioteca.listarMembros();

  expect(membros.length).toStrictEqual(1);
  expect(membros[0].id).toStrictEqual(1);
});

test("Remover membro", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarMembro({
    id: 1
  });

  biblioteca.removerMembro(1);

  expect(biblioteca.contarMembros()).toStrictEqual(0);
});

test("Buscar membro por id", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarMembro({
    id: 1
  });

  const membro = biblioteca.buscarMembroPorId(1);

  expect(membro.id).toStrictEqual(1);
});

test("Buscar membro inexistente por id", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarMembro({
    id: 1
  });

  const membro = biblioteca.buscarMembroPorId(2);

  expect(membro).toBeUndefined();
});

test("Emprestar livro válido", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    emprestado: false
  });

  biblioteca.adicionarMembro({
    id: 1
  });

  const sucesso = biblioteca.emprestarLivro(1, 1);
  const livro = biblioteca.buscarLivroPorId(1);

  expect(sucesso).toBeTruthy();
  expect(livro.emprestado).toBeTruthy();
  expect(livro.idMembro).toStrictEqual(1);
});

test("Emprestar livro inválido", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    emprestado: true
  });

  biblioteca.adicionarMembro({
    id: 1
  });

  const sucesso = biblioteca.emprestarLivro(1, 1);

  expect(sucesso).toBeFalsy();
});

test("Devolver livro válido", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    emprestado: true
  });

  biblioteca.adicionarMembro({
    id: 1
  });

  const sucesso = biblioteca.devolverLivro(1);
  const livro = biblioteca.buscarLivroPorId(1);

  expect(sucesso).toBeTruthy();
  expect(livro.emprestado).toBeFalsy();
  expect(livro.idMembro).toBeUndefined();
});

test("Devolver livro inválido", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    emprestado: false
  });

  biblioteca.adicionarMembro({
    id: 1
  });

  const sucesso = biblioteca.devolverLivro(1);

  expect(sucesso).toBeFalsy();
});

test("Listar livros emprestados", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    emprestado: true
  });

  biblioteca.adicionarLivro({
    id: 2,
    emprestado: false
  });

  const livros = biblioteca.listarLivrosEmprestados();

  expect(livros.length).toStrictEqual(1);
});

test("Listar livros disponíveis", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    emprestado: true
  });

  biblioteca.adicionarLivro({
    id: 2,
    emprestado: false
  });

  const livros = biblioteca.listarLivrosDisponiveis();

  expect(livros.length).toStrictEqual(1);
});

test("Listar livros por autor", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    autor: "Michael Scott"
  });

  biblioteca.adicionarLivro({
    id: 2,
    autor: "Dwight"
  });

  const livros = biblioteca.listarLivrosPorAutor("Michael");

  expect(livros.length).toStrictEqual(1);
  expect(livros[0].id).toStrictEqual(1);
});

test("Listar livros por gênero", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    genero: "Terror"
  });

  biblioteca.adicionarLivro({
    id: 2,
    genero: "Ficção"
  });

  const livros = biblioteca.listarLivrosPorGenero("Ficção");

  expect(livros.length).toStrictEqual(1);
  expect(livros[0].id).toStrictEqual(2);
});

test("Atualizar informações de um livro válido", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    titulo: "The Office",
    autor: "Michael Scott",
    genero: "Terror"
  });

  const expected = {
    titulo: "The Office 2",
    autor: "Michael Scott 2",
    genero: "Terror 2"
  };

  biblioteca.atualizarInformacaoLivro(1, expected);

  const livro = biblioteca.buscarLivroPorId(1);

  expect(livro.titulo).toStrictEqual(expected.titulo);
  expect(livro.autor).toStrictEqual(expected.autor);
  expect(livro.genero).toStrictEqual(expected.genero);
});

test("Atualizar informações de um livro inválido", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.atualizarInformacaoLivro(1, {
    titulo: "The Office 2",
    autor: "Michael Scott 2",
    genero: "Terror 2"
  });

  expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
});

test("Buscar livros por ano", async () => {
  const biblioteca = new Biblioteca();

  biblioteca.adicionarLivro({
    id: 1,
    ano: 1889
  });

  biblioteca.adicionarLivro({
    id: 2,
    ano: 2020
  });

  const livros = biblioteca.listarLivrosPorAno(2020);

  expect(livros.length).toStrictEqual(1);
  expect(livros[0].id).toStrictEqual(2);
});

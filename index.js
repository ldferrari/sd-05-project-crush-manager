const express = require('express'); // Primeiro passo é a importação do express

const app = express(); // Segundo passo: atribuir a função express na variavel app

// 3 arquivos para organizar as rotas
const root_signup = require('./root_signup'); // importando o arquivo do POST /login

app.use(express.json()); // Para retornar em formato json

// não remova esse endpoint, e para o avaliador funcionar
// para criação de rota é necessário 2 coisas: método HTTP e endpoint
app.get('/', (_request, response) => {
  // método HTTP: get + endpoint: '/' = rota
  response.send('Hello no VSCODE');
});
// ------------------------------------

app.use('/login', root_signup); // Puxando o arquivo onde o post foi criado.

const PORT = 3000; // Porta para conectar

app.listen(PORT, () => { // app.listen serve para escutar a porta (aparece no terminal)
  console.log('Hugao mestre')
});
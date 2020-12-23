const express = require('express'); // importando o express (npm i express | para instalar)

const app = express(); // criando uma instancia do express (criando o servidor)

const bodyParse = require('body-parser'); // transforma a requisição em JSON

const fs = require('fs').promises;

app.use(bodyParse.json());
const crypto = require('crypto');

// não remova esse endpoint, e para o avaliador funcionar
// para criação de rota é necessário 2 coisas: método HTTP e endpoint
app.get('/', (_request, response) => {
  // método HTTP: get + endpoint: '/' = rota
  response.send('Hello no VSCODE');
});
// ------------------------------------
const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({
      message: `O campo "email" é obrigatório${''}`,
    });
  }

  const regexEmail = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{3})*$/,
  );

  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: `O "email" deve ter o formato "email@email.com"${''}`,
    });
  }

  if (password === undefined) {
    return res.status(400).json({
      message: `O campo "password" é obrigatório${''}`,
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: `A "senha" deve ter pelo menos 6 caracteres${''}`,
    });
  }

  next();
};

app.post('/login', loginMiddleware, (req, res) => {
  console.log('Ja estou aqui');
  const token = crypto.randomBytes(8).toString('hex'); // 1 byte = 0000 0101
  res.status(200).json({ token });
});

const authTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (token.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

app.get('/crush', authTokenMiddleware, async (req, res) => {
  const readCrush = await fs.readFile('./crush.json', 'utf-8');
  const arrayCrush = await JSON.parse(readCrush);
  res.status(200).json(arrayCrush);
});

// app.post('/crush', (req, res) => {})

// app.use() -> faz com que a função funcione para toda aplicação

// conectando com o servidor
app.listen(3000, () => console.log('Cochilando na porta 3000!!'));
// npm run start: aciona o nodemon que inicia meu servidor

const express = require('express');

const app = express();

const crypto = require('crypto-js'); // Gerador de tokens
const middleware = require('./middleware');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', middleware.exercicio01, (_req, res, _next) => {
  const { MD5 } = crypto;
  const token = MD5().toString().substr(0, 16);
  res.status(200).json({ token });
});

/* const middleWare = (request, response, next) => {
  console.log("test");
  next();
}; */

// const authMiddleWare = (request, response, next) => {
//   if ((TokenGenerator.isValid(token).lenght) === (request.headers.token).lenght) {
//     next();
//   } else {
//     console.log(TokenGenerator.isValid(request.headers.token));
//     response.status(401).send({ message: "token inválido"});
//   }
// }

// app.use(authMiddleWare);

app.listen(3000);

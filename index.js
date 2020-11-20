const express = require('express');
const app = express();

const middleware = require('./middleware'); 
const { MD5 } = require('crypto-js'); // Gerador de tokens

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.post("/login", middleware.exercicio01, function (_req, res) {
  const token = MD5().toString().substr(0, 16);
  res.status(200).json({ token })
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

app.listen(3000, function() {console.log('porta 3000')});

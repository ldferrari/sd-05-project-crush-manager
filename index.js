const express = require('express');
const randtoken = require('rand-token');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
// const gerarToken = require('./services/gerarToken');
// const randomToken = require('random-token');

const app = express();

// const rt = randomToken.gen();
// const token = randomToken.gen(16);

const token = randtoken.generate(16);

app.use(bodyParser.json());

app.use(express.json());

// app.get('/ping', (_, res) => {
//   res.status(200).json({ message: 'pong!' });
// });

app.post('/login', middlewares.validaEmail, middlewares.validaPassword, (req, res) => {
  // console.log(token);
  res.status(200).json({ token: token });
});

const PORT = 3000;

app.listen(PORT, () => { 
  console.log(`Escutando na porta ${PORT}`); 
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

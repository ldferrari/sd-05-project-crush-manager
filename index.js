const express = require('express');
const randToken = require('rand-token'); // indicação do Felipe Vieira
const { checkEmail, checkPassword } = require('./middlewares');

const PORT = 3000;


const app = express();

const logMiddleware = (req, res, next) => {
  console.log(`${req.method}, ${req.path}`);
  next();
};

const genRandomToken = () => {
  const token = randToken.generate(16);
  return { token };
};

app.use(express.json());
app.use(logMiddleware);

app.post('/login', checkEmail, checkPassword, (req, res) => {
  console.log(req.body);
  res.status(200).json(genRandomToken());
});

app.post('/crush', checkEmail, (req, res) => {
});

app.get('/', (request, response) => {
  response.send();
});


app.listen(PORT, () => console.log('Olha mãe, no na 3000'));

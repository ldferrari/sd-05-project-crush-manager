const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const { genToken, validateLogin } = require('./middlewares');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.post('/login', validateLogin, rescue(async (_, res) => {
  const token = genToken();
  return res.status(200).json(token);
}));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_, res) => { res.send(); });

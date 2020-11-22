const express = require('express');

const app = express();

const crypto = require('crypto');

const {
  loginCheck,
} = require('./middleware');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', loginCheck, (_req, res) => {
  const token = generateToken();
  return res.status(200).send({ token });
});

app.listen(3000, () => console.log('Conectamos clã!'));

const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const generateToken = require('./services/generate-token');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.validateEmail, middlewares.validatePassword, (req, res) => {
  res.status(200).json({ token: generateToken() });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});

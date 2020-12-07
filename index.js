const express = require('express');
const randtoken = require('rand-token');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();

const gerarToken = randtoken.generate(16);

app.use(bodyParser.json());

app.use(express.json());

app.post('/login', middlewares.validaEmail, middlewares.validaPassword, (req, res) => {
  // console.log(token);
  res.status(200).json({ token: gerarToken });
});

app.get('/crush', middlewares.auth, middlewares.readCrushes);

app.post('/crush', middlewares.auth, middlewares.validate, middlewares.criarCrush);

app.get('/crush/search', middlewares.auth, middlewares.searchCrush);

app.get('/crush/:id', middlewares.auth, middlewares.searchCrushById);

app.put('/crush/:id', middlewares.auth, middlewares.validate, middlewares.updateCrush);

app.delete('/crush/:id', middlewares.auth, middlewares.deleteCrush);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

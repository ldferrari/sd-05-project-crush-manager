const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const geradorToken = require('./service/token');
const crushFile = require('./service/readFile');
const app = express();

app.use(bodyParser.json());

app.post(
  '/login',
  middleware.validaEmail,
  middleware.validaSenha,
  (_req, res) => {
  const token = geradorToken();
  return res.status(200).json({ token });
});

app.post(
  '/crush',
  middleware.validaNome,
  middleware.validaIdade,
  middleware.validaData,
  middleware.validaToken,
  (req, res) => {
    const { name, age, date } = req.body;
    const id = crushFile.length +1;
    const newCrush = {
      id: id,
      name: '',
      age: '',
      data: {
        dataAt,
        rate,
      }
    }
  }
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Hashirama de cão na porta ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

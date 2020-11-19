const express = require('express');
const bodyParser = require('body-parser');

const {
  errorMiddleware,
  authMiddleware,
  crushMiddleware,
} = require('./middleware');

const { getCrushLastId } = require('./services/utils.service');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', authMiddleware, (req, res) => {
  const { token } = req;
  res.status(200).json({ token });
});

app.post('/crush', crushMiddleware, (req, res) => {
  const { crush } = req;
  res.status(201).json({ ...crush, id: getCrushLastId() + 1 });
});

app.use(errorMiddleware);

app.listen(3000, () => { console.log('Online'); });

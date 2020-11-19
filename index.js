const express = require('express');
const bodyParser = require('body-parser');

const { NO_CRUSH } = require('./dictionary/errors.dictionary');

const {
  authMiddleware,
  addCrushMiddleware,
  errorMiddleware,
  loginMiddleware,
} = require('./middleware');

const {
  getCrushDB,
  getCrushById,
  getCrushLastId,
} = require('./services/utils.service');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/crush', authMiddleware, async (_req, res) => {
  res.status(200).json(await getCrushDB());
});

app.get('/crush/:id', authMiddleware, async (req, res, next) => {
  const { params: { id } } = req;
  const crush = await getCrushById(id);
  try {
    if (crush.length) res.status(200).json(crush[0]);
    else throw new Error(NO_CRUSH);
  } catch ({ message }) {
    next({ message });
  }
});

app.post('/login', loginMiddleware, (req, res) => {
  const { token } = req;
  res.status(200).json({ token });
});

app.post('/crush', addCrushMiddleware, (req, res) => {
  const { crush } = req;
  res.status(201).json({ ...crush, id: getCrushLastId() + 1 });
});

app.use(errorMiddleware);

app.listen(3000, () => { console.log('Online'); });

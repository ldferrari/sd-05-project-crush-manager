const express = require('express');
const bodyParser = require('body-parser');

const { NO_CRUSH } = require('./dictionary/errors.dictionary');
const { DELETED_CRUSH } = require('./dictionary/success.dictionary');

const {
  authMiddleware,
  addCrushMiddleware,
  errorMiddleware,
  loginMiddleware,
} = require('./middleware');

const {
  deleteCrushById,
  getCrushById,
  getCrushByQuery,
  getCrushDB,
  registerCrush,
  updateCrushById,
} = require('./services/utils.service');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/crush/search', authMiddleware, async (req, res) => {
  const { query } = req;
  if (!Object.keys(query).includes('q')) res.status(200).json([]);
  const crushList = await getCrushByQuery(query.q);
  res
    .status(crushList.length ? 200 : 201)
    .json(crushList);
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

app.get('/crush', authMiddleware, async (_req, res) => {
  res.status(200).json(await getCrushDB());
});

app.post('/login', loginMiddleware, (req, res) => {
  const { token } = req;
  res.status(200).json({ token });
});

app.post('/crush', addCrushMiddleware, async (req, res) => {
  const { crush } = req;
  const result = await registerCrush(crush);
  res.status(201).json(result);
});

app.put('/crush/:id', addCrushMiddleware, async (req, res) => {
  const { params: { id }, crush } = req;
  const result = await updateCrushById(id, crush);
  res.status(200).json(result);
});

app.delete('/crush/:id', authMiddleware, async (req, res) => {
  const { params: { id } } = req;
  const result = await deleteCrushById(id);
  if (result) res.status(200).json({ message: DELETED_CRUSH });
  else res.status(200).json({ message: 'Nenhuma' });
});

app.use(errorMiddleware);

app.listen(3000, () => { console.log('Online'); });

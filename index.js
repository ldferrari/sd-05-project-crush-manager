const express = require('express');
const randToken = require('rand-token'); // indicação do Felipe Vieira
const {
  checkEmail,
  checkPassword,
  checkCrushName,
  checkCrushDate,
  checkCrushAge,
  checkToken,
  createCrush,
  readCrush,
} = require('./middlewares');

const { crush: crushEnums } = require('./enums');

const PORT = 3000;

const app = express();

const genRandomToken = () => {
  const token = randToken.generate(16);
  return { token };
};

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.get('/crush', checkToken, async (_req, res, _next) => {
  const { data } = await readCrush();
  res.status(200).send(data || []);
});

app.get('/crush/:id', checkToken, async (req, res, _next) => {
  const data = await readCrush(req.params.id);
  if (!data) {
    return res.status(404).send(crushEnums.notFound);
  }
  res.status(200).send(data || []);
});

app.post('/login', checkEmail, checkPassword, (_req, res, next) => {
  res.status(200).send(genRandomToken());
  next();
});

app.post(
  '/crush',
  checkToken,
  checkCrushName,
  checkCrushAge,
  checkCrushDate,
  async (req, res, next) => {
    const { name, age, date } = req.body;
    const newCrush = await createCrush({ name, age, date });
    if (!newCrush) {
      return res.status(400).json({ message: 'Não foi possível criar novo crush!' });
    }
    res.status(201).json(newCrush);
    next();
  },
);

app.listen(PORT, () => console.log(`You shall pass on ${PORT}`));

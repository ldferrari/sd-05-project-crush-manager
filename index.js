const express = require('express');
const randToken = require('rand-token'); // indicação do Felipe Vieira

const app = express();
const router = express.Router();

const logMiddleware = (req, res, next) => {
  console.log(`${req.method}, ${req.path}`);
  next();
};

const genRandomToken = () => {
  const token = randToken.generate(16);
  return { token };
};

const checkPassword = (req, res, next) => {
  const { password } = req.headers;
  if (!password || password === '') {
    res.status(400).send({ message: 'O campo "password" é obrigratório' });
  } else if (password.length < 6) {
    res.status(400).send({ message: 'A "senha" deve conter pelo menos 6 caracteres' });
  } else {
    next();
  }
};

const checkEmail = (req, res, next) => {
  const { email } = req.headers;
  const pattern = new RegExp(/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/, 'i');
  if (!email || email === '') {
    res.status(400).send({ message: 'O campo "email" é obrigratório' });
  } else if (!pattern.test(email)) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else {
    next();
  }
};

router.use(logMiddleware);
router.use(checkPassword);
router.use(checkEmail);
app.use('/', router);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

router.post('/login', (req, res, next) => {
  res.send(genRandomToken());
  next();
});
app.listen(3000, () => console.log('Olha mãe, no na 3000'));

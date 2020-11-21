const express = require('express');
const fs = require('fs').promises;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/crush', (req, res, next) => {
  const { token } = req.headers;
  if (token === undefined) {
    res.status(401).send({"message": "Token não encontrado"});
  } else if (token.length !== 16 || token === '') {
    res.status(401).send({"message": "Token inválido"});
  } else {
    next();
  }
});

app.get('/crush', async (_req, res, _next) => {
  const crushs = await fs.readFile('./crush.json', 'utf8');
  if (crushs === '') {
    res.status(200).send([]);
  } else {
    res.status(200).send(crushs);
  }
})

app.listen(3000, () => {
  console.log('on')
})

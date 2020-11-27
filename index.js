const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');
const { middleWareFS, middleWareLogin, middleWareToken } = require('./middleWares');

const app = express();
app.use(bodyparse.json());
const PORT = 3000;

app.post('/login', middleWareLogin.login, (_req, res, _next) =>
  res.status(200).json({
    token: crypto.randomBytes(8).toString('hex'),
  }));

app.get('/crush', middleWareToken, async (_req, res, _next) => {
  const returnData = await middleWareFS();
  res.status(200).json(returnData);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));

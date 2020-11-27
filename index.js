const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');
const {
  middleWareAge,
  usingFiles,
  middleWareLogin,
  middleWareName,
  middleWareToken,
  middleWareDate,
} = require('./middleWares');

const app = express();
app.use(bodyparse.json());
const PORT = 3000;

app.post('/login', middleWareLogin.login, (_req, res, _next) =>
  res.status(200).json({
    token: crypto.randomBytes(8).toString('hex'),
  })
);

app.get('/crush', middleWareToken, async (_req, res, _next) => {
  const returnData = await usingFiles.readFile();
  res.status(200).json(returnData);
});

app.post('/crush', middleWareToken, middleWareName, middleWareAge, middleWareDate, async (req, res, _next) => {
  const crushObj = await usingFiles.writeFile(req.body);
  res.status(201).json(crushObj);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));

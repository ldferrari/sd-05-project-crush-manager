const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyparse.json());
const PORT = 3000;

app.post('/login', middlewares.login, (_req, res) =>
  res.status(200).json({
    token: crypto.randomBytes(8).toString('hex'),
  }));

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

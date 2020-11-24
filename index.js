const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');
const midwares = require('./midwares');

const app = express();
app.use(bodyparse.json());
const PORT = 3000;
const emailValid = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{3})*$/);

app.post('/login', midwares.login, (_req, res) => {
  
  return res.status(200).json({
    token: crypto.randomBytes(8).toString('hex')
  });
});

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

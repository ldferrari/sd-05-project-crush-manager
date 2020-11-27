const express = require('express');
const crypto = require('crypto');
/* const fs = require('fs').promises; */
const bodyparse = require('body-parser');
const middleWareLogin = require('./middleWares/login');
/* const middleWareToken = require('./middleWares/token'); */

const app = express();
app.use(bodyparse.json());
const PORT = 3000;

app.post('/login', middleWareLogin.login, (_req, res, _next) =>  res.status(200).json({
    token: crypto.randomBytes(8).toString('hex'),
  })
);

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

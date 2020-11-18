const randtoken = require('rand-token');
const express = require('express');
const middleware = require('./middlewares');

const app = express();
const PORT = 3000;
const genToken = randtoken.generate(16);

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/login', middleware.checkEmail, middleware.checkPass, (_req, res, _next) => {
  res.send({
    token: genToken,
  });
});
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

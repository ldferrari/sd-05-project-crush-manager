const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

app.use(middlewares.logger);
app.use(middlewares.error);
app.use('/login', middlewares.auth);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', middlewares.logger, (request, response) => {
  response.send();
});
app.post('/login', middlewares.auth, (request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  response.status(200).json({ token });
});

const PORT = 3000;
app.listen(PORT, console.log(`Listening on port :${PORT}`));

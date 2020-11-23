const express = require('express');
const bodyParser = require('body-parser');
// const Joi = require('joi');

const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());
// const urlenconderParser = bodyParser.urlencoded({ extended: false });

// app.use(express.json());

// const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', /* urlenconderParser,  */middlewares.login);

app.listen(3000, () => console.log('ouvindo na porta 3000'));

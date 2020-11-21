const express = require('express');
const routeSignUp = require("./routeSignUp");
// const validaToken = require('./validaToken');
const app = express();

app.use('/login', routeSignUp);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
/////////////////////////////////////////////////////////

app.listen(3000, () => console.log('Porta conectada'));

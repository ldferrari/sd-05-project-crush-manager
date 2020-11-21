const express = require('express');

const rotaIndex = require('./rotaIndex');

// const validaToken = require('./')

const app = express();
app.use('/login', rotaIndex);
// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Pai baixou!'));

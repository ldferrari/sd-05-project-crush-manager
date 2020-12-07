const express = require('express');
const bodyParser = require('body-parser');

const { auth, crush } = require('./controllers');

const app = express();
app.use(bodyParser.json());

app.use('/login', auth);
app.use('/crush', crush);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, console.log('IH ALÁ, OLHA SÓ QUEM STARTOU'));

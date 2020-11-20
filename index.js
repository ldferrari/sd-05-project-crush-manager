const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', auth.setLogin);

app.post('/crush')

app.listen(3000, () => console.log('Listening on 3000'));

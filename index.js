const express = require('express');
const m = require('./middleware');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', m.errorEmail, m.errorPassword, m.exercicio01);
app.post('/crush', m.errorToken, m.errorName, m.errorAge, m.errorDate, m.exercicio02);
app.get('/crush', m.errorToken, m.exercicio03);
app.get('/crush/:id', m.exercicio03vazio);

app.listen(3000, () => console.log('Test Listen'));

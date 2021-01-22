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
app.get('/crush/search', m.errorToken, m.exercicio07);
app.get('/crush/:id', m.errorToken, m.errorId, m.exercicio04);
app.put('/crush/:id', m.errorToken, m.errorName, m.errorAge, m.errorDate, m.exercicio05);
app.delete('/crush/:id', m.errorToken, m.exercicio06);

app.listen(3000, () => console.log('Test Listen'));

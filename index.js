const express = require('express');

const middlewares = require('./middlewares');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// console.log(`chave: ${token}`);

app.use(express.json());

// app.use(middlewares.auth);

app.post('/login', middlewares.auth);

app.get('/ping', (_, res) => {
  res.json({ message: 'ping test' });
});

app.listen(PORT, () => console.log('listening on 3k'));

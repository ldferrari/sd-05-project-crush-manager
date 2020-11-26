const express = require('express');

const middlewares = require('./middlewares');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', middlewares.login);

app.get('/crush/search', middlewares.auth, middlewares.browse);

app.post('/crush', middlewares.auth, middlewares.people, middlewares.increase);

app.get('/crush', middlewares.auth, middlewares.list);

app.get('/crush/:id', middlewares.auth, middlewares.search);

app.put('/crush/:id', middlewares.auth, middlewares.people, middlewares.edit);

app.delete('/crush/:id', middlewares.auth, middlewares.erase);

app.listen(PORT, () => console.log('listening on 3k'));

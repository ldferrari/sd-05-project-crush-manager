const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// requisito 1 - login
app.post('/login', middlewares.login);

// requisito 3 - ler todos os crush
app.get('/crush', middlewares.auth, middlewares.readList);

// app.post('/crush', middleares.auth, middlewares.createCrush);
// app.get('/crush/:id', middlewares.auth, middlewares.searchCrush);
// app.put('/crush/:id', middlewares.auth, middlewares.editCrush);
// app.delete('/crush/:id', middlewares.auth, middlewares.deleteCrush);

const PORT = 3000;
app.listen(PORT, console.log(`Toc toc, é o crush? ${PORT}`));

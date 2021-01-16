const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.login);
// app.get('/crush', middlewares.token, middlewares.getCrush);
// app.post('/crush', middleares.token, middlewares.createCrush);
// app.get('/crush/:id', middlewares.token, middlewares.searchCrush);
// app.put('/crush/:id', middlewares.token, middlewares.editCrush);
// app.delete('/crush/:id', middlewares.token, middlewares.deleteCrush);

const PORT = 3000;
app.listen(PORT, console.log(`Toc toc, é o crush? ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const middleWares = require('./middleWares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middleWares.login);
app.get('/crush', middleWares.token, middleWares.getCrush);
app.post('/crush', middleWares.token, middleWares.createCrush);
app.get('/crush/:id', middleWares.token, middleWares.searchCrush);
app.put('/crush/:id', middleWares.token, middleWares.editCrush);
app.delete('/crush/:id', middleWares.token, middleWares.deleteCrush);
// app.get('/crush/search?q=searchTerm', middleWares.search, middleWares.filterCrush);

const PORT = 3000;
app.listen(PORT, console.log(`Toc toc, é o crush? ${PORT}`));

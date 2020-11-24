const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

//  não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => response.send());

app.post('/login', middlewares.logger);

app.get('/crush/search', middlewares.auth, middlewares.searchCrush);

//  crush by id routes
app.put('/crush/:id', middlewares.auth, middlewares.editCrush);
app.get('/crush/:id', middlewares.auth, middlewares.getCrushById);

app.get('/crush', middlewares.auth, middlewares.getAllCrushs);
app.post('/crush', middlewares.auth, middlewares.createCrush);

app.delete('/crush/:id', middlewares.auth, middlewares.deleteCrush);

const PORT = 3000;
app.listen(PORT, console.log(`Listening on port :${PORT}`));

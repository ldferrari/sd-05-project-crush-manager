const bodyParser = require('body-parser');
const express = require('express');
const rescue = require('express-rescue');

const { auth, error, email, password, name, age, date, getCrush, createCrush, getById, updateCrush, deleteCrush, searchCrush } = require('./middlewares');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', email, password);

app.post('/crush', auth, name, age, date, rescue(createCrush));

app.get('/crush/search', auth, rescue(searchCrush));

app.get('/crush', auth, rescue(getCrush));

app.put('/crush/:id', auth, name, age, date, rescue(updateCrush));

app.get('/crush/:id', auth, rescue(getById));

app.delete('/crush/:id', auth, rescue(deleteCrush));

app.use(error);

app.listen(PORT, () => {
  console.log(`hi lorena ${PORT}`);
});

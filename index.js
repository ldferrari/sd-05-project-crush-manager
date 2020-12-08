const express = require('express');
const bodyParser = require('body-parser');

const { userLog } = require('./middlewares/userValidation');
const { getToken } = require('./middlewares/getToken');
const { crushValidation } = require('./middlewares/crushValidation');
const { createCrush } = require('./controller/createCrush');
const {
  getCrushById,
  getAllCrushs,
  deleteCrush,
  updateCrush,
  searchCrush,
} = require('./controller/crushController');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});
// requisito 1
app.post('/login', userLog);

// requisito 2
app.post('/crush', getToken, crushValidation, createCrush);

// requisito 3
app.get('/crush', getToken, getAllCrushs);

// requisito7
app.get('/crush/search', getToken, searchCrush);

// requisito 4
app.get('/crush/:id', getToken, getCrushById);

// requisito 5
app.put('/crush/:id', getToken, crushValidation, updateCrush);

// requisito 6
app.delete('/crush/:id', getToken, deleteCrush);

app.listen(3000, () => console.log('Listening on 3000'));

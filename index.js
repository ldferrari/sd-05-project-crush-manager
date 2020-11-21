const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const {
  generateToken,
  validateEmail,
  validatePassword,
  validateToken,
  getAllCrushs,
  validateName,
  validateAge,
  validateDate,
  createCrush,
  getCrushById,
  editCrush,
} = require('./middlewares/index');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

// Requisito 1
app.post('/login', validateEmail, validatePassword, generateToken);

// Requisito 2
app.post('/crush', validateToken, validateName, validateAge, validateDate, createCrush);

// Requisito 3
app.get('/crush', validateToken, getAllCrushs);

// Requisito 4
app.get('/crush/:id', validateToken, getCrushById);

// Requisito 5
app.put('/crush/:id', validateToken, validateName, validateAge, validateDate, editCrush);

app.listen(3000, () => console.log('Listening to port 3000'));

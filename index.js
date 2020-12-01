const express = require('express');
const bodyParser = require('body-parser');

const { userLog } = require('./controller/userController');
const { getToken } = require('./middlewares/getToken');
const { setCrush } = require('./middlewares/setCrush');
const { createCrush } = require('./controller/crushController');
const { getCrush } = require('./middlewares/getCrush');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', userLog);

app.post('/crush', getToken, setCrush, createCrush);

// app.get('/crush', getToken, getCrush);

// app.get('/crush/:id', )

// app.put('/crush/:id', )

app.listen(3000, () => console.log('Listening on 3000'));

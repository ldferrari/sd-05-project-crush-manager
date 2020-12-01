const express = require('express');
const bodyParser = require('body-parser');

const { userLog } = require('./middlewares/userValidation');
const { getToken } = require('./middlewares/getToken');
const { crushValidation } = require('./middlewares/crushValidation');
const { createCrush } = require('./controller/createCrush');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', userLog);

app.post('/crush', getToken, crushValidation, createCrush);

// app.get('/crush', getToken, );

// app.get('/crush/:id', )

// app.put('/crush/:id', )

app.listen(3000, () => console.log('Listening on 3000'));

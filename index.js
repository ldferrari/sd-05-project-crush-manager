const express = require('express');
const bodyParser = require('body-parser');
const { dataAuth } = require('./middlewares/authMid');
const { userLogin } = require('./controller/userController');
// const { setCrush } = require('./middlewares/crushMid');
//const middleware = require('./middlewares/index);

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (request, response) => {
//   response.send('Olá');
// });

app.post('/login', dataAuth, userLogin);

// app.post('/crush', setCrush);

// app.get('/crush')

app.listen(3000, () => console.log('Listening on 3000'));

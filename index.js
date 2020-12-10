const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./middleWares/loginRoute');
const crushCreator = require('./middleWares/crushCreator');
const tokenVerifier = require('./middleWares/tokenVerifier');
const allCrushes = require('./middleWares/allCrushes');
const crushFinder = require('./middleWares/findCrush');
const crushEditor = require('./middleWares/crushEditor');
const crushDeleter = require('./middleWares/deletedCrush');
const crushSearcher = require('./middleWares/crushSearcher');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', loginRoute);
app.post('/crush', tokenVerifier, crushCreator);
app.get('/crush', tokenVerifier, allCrushes);
app.get('/crush/search', tokenVerifier, crushSearcher); // unico jeito de passar foi jogando ele antes do crush finder..
app.get('/crush/:id', tokenVerifier, crushFinder);
app.put('/crush/:id', tokenVerifier, crushEditor);
app.delete('/crush/:id', tokenVerifier, crushDeleter);
app.use((err, req, res, next) => {
  next(console.error(err));
  res.status(500).json({ message: 'internal server error' });
});

app.listen(3000, () => console.log('Navi: Hey, Listen!'));

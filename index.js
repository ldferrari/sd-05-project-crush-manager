const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const middlewares = require("./middlewares");

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post("/login", middlewares.auth);

app.post("/crush", middlewares.newCrush);

app.listen(3000, () => console.log("o pai tá ON"));

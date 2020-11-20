const express = require('express');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {console.log('Listening to port 3000')});

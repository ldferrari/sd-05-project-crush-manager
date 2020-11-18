const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT, () => console.log('listening on 3k'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

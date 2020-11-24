const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');

const app = express();
app.use(bodyparse.json());
const PORT = 3000;
const emailValid = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{3})*$/);

app.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailValid.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
console.log(password)
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({
    token: crypto.randomBytes(8).toString('hex')
  });
});
app.listen(PORT, () => console.log(`Looking at port ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

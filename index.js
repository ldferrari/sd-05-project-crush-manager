const express = require('express');

const app = express();

const crypto = require('./generate-token.js');

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === undefined || email === '') {
    return res.status(400).json(
      {
        message: 'O campo "email" é obrigatório',
      },
    );
  }
  if (!validateEmail(email)) {
    return res.status(400).json(
      {
        message: 'O "email" deve ter o formato "email@email.com"',
      },
    );
  }
  if (password === undefined || password === '') {
    return res.status(400).json(
      {
        message: 'O campo "password" é obrigatório',
      },
    );
  }
  if (password.length < 6) {
    return res.status(400).json(
      {
        message: 'O "password" ter pelo menos 6 caracteres',
      },
    );
  }

  res.status(200).json(
    {
      token: crypto(),
    },
  );
});

app.listen(3000, () => {
  console.log('Estou monitorando a porta 3000');
});

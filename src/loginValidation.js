const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const authValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = { authValidation };

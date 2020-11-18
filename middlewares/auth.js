const express = require('express');
const crypto = require('crypto');

function verifyEmail(email) {
  const eRegex = /^([a-zA-Z0-9_-]+)@email\.com$/gm;
  return eRegex.test(email);
}

function verifypassword(password) {
  const pRegex = /^.{6,}$/;
  return pRegex.test(password);
}

const auth = (req, res) => {
  const Email = req.body.email;
  // console.log(Email);
  const { password } = req.body;
  // console.log(password);
  const passwordIsValid = verifypassword(password);
  // console.log(passwordIsValid);
  const emailIsValid = verifyEmail(Email);
  // console.log(emailIsValid);

  if (!Email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (!passwordIsValid) {
    return res.status(400).json({ message: 'O "password" ter pelo menos 6 caracteres' });
  } else if (emailIsValid && passwordIsValid) {
    const token = crypto.randomBytes(16).toString('hex');
    return res.status(200).json({ token: token });
  }
  else {
    return res.status(401).json('deu ruim');
  }
};

module.exports = auth;

const crypto = require('crypto');

module.exports = async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;

  // regex https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const validateEmail = (myEmail) => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(myEmail).toLowerCase());
  };

  const validadePassword = (myPassword) => {
    if (myPassword.length >= 6) {
      return true;
    }
    return false;
  };

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validadePassword(password)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token });
};

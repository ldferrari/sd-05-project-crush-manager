const crypto = require('crypto');

// regex https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (email === '' || !email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato email@email.com' });
  }
  if (password === '' || !password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
};

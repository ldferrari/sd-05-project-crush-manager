const crypto = require('crypto');

function verifyEmail(email) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}
function verifypassword(password) {
  const passwordRegex = /^\d{4,8}$/gm;
  return passwordRegex.test(password);
}

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const emailIsValid = verifyEmail(email);
  const passwordIsValid = verifypassword(password);
  if (emailIsValid && passwordIsValid) {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  }
  if (email === '' || !email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === '' || !password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
};

/* tentei usar express.Route() porem não estava funcionando.. aprendi que dava pra fazer apenas
com um module.exports */

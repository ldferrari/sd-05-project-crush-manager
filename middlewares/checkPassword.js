const token = require('../utilities/createToken');

module.exports = (req, res) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  return password.length < 6 ? res.status(400)
    .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' })
    : res.status(200).json({ token: token() });
};

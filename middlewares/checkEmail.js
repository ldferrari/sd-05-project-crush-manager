const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  return email.match(regex) ? next()
    : res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

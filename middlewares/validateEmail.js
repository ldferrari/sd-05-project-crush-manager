module.exports = (req, res, next) => {
  const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (req.body.email) {
    if (req.body.email.match(regEmail)) {
      next();
    } else {
      res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
  } else {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
};

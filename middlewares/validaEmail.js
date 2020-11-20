module.exports = (req, res, next) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // console.log(req.body.email);
  if (req.body.email) {
    if (req.body.email.match(emailRegex)) {
      next();
    } else {
      res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
  } else {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
};

module.exports = (err, _req, res, next) => {
  res.status(500).json({ message: 'algo deu errado' });
  next(err);
};

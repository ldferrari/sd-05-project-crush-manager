module.exports = (err, _req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado :(');
  next();
};

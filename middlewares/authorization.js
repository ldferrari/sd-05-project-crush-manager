const authorization = (req, res, next) => {
  switch (true) {
    case !req.headers.authorization:
      return res.status(401).send({
        message: 'Token não encontrado',
      });
    case req.headers.authorization.length !== 16:
      return res.status(401).send({
        message: 'Token inválido',
      });
    default:
      return next();
  }
};

module.exports = {
  authorization,
};

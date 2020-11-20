const validaSenha = (req, res, next) => {
  const { password } = req.body;

  if (password === undefined || password === '') {
    return res.status(400).json({
      message: 'O campo \"password\" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'A \"senha\" deve ter pelo menos 6 caracteres',
    });
  }

  return next();
};

module.exports = validaSenha;

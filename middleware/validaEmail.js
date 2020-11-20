const validaEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  if (email === undefined || email === '') {
    return res.status(400).json({
      message: 'O campo \"email\" é obrigatório',
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'O \"email\" deve ter o formato \"email@email.com\"',
    });
  }
  
  return next();
};

module.exports = validaEmail;



function emailValido (email) {
  var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
   return emailPattern.test(email);
};

const exercicio01 = (req, res, next) => {
  const {email} = req.body;
  const {password} = req.body;
  if (!email) {
    res.status(400).json({"message": "O campo \"email\" é obrigatório"});
  }
  if (!emailValido(email)) {
    res.status(400).json({"message": "O \"email\" deve ter o formato \"email@email.com\""});
  }
  if (!password) {
    res.status(400).json({"message": "O campo \"password\" é obrigatório"});
  }
  if (password.toString().length < 6) {
    res.status(400).json({"message": "A \"senha\" deve ter pelo menos 6 caracteres"});
  }
  return next();
};

module.exports = exercicio01;

const randtoken = require('rand-token');

function verifyEmail(email) {
  const eRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i;
  return eRegex.test(email);
}

function verifypassword(password) {
  const pRegex = /^.{6,}$/;
  // const sPassword = password.toString();
  // console.log(sPassword);
  return pRegex.test(password);
}

const auth = (req, res) => {
  const Email = req.body.email;
  // console.log(Email);
  const { password } = req.body;
  console.log(password);
  const passwordIsValid = verifypassword(password);
  // console.log(passwordIsValid);
  const emailIsValid = verifyEmail(Email);
  // console.log(emailIsValid);

  if (!Email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (!passwordIsValid) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } if (emailIsValid && passwordIsValid) {
    const rtoken = randtoken.generate(16);
    // const rtoken = crypto.randomBytes(16).toString('hex');
    return res.status(200).json({ token: rtoken });
  } return res.status(401).json('deu ruim');
};

module.exports = auth;

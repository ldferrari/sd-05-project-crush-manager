const { emailIsValid, passwordIsValid } = require('../models/userModel');

const userLog = (req, res) => {
  const { email, password } = req.body;
  const emailWorks = emailIsValid(email);
  const passwordWorks = passwordIsValid(password);
  if (emailWorks.message) {
    return res.status(400).json({ message: emailWorks.message });
  }
  if (passwordWorks.message) {
    return res.status(400).json({ message: passwordWorks });
  }
  return true;
};

module.exports = { userLog };

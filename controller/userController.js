const crypto = require('crypto');
const { emailIsValid, passwordIsValid } = require('../models/userModel');

const userLog = (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  const emailWorks = emailIsValid(email);
  const passwordWorks = passwordIsValid(password);
  if (emailWorks.message) {
    console.log(emailWorks.message);
    return res.status(400).json({ message: emailWorks.message });
  }
  if (passwordWorks.message) {
    return res.status(400).json({ message: passwordWorks.message });
  }
  return res.status(200).json({ token });
};

module.exports = { userLog };

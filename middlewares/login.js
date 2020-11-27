const enums = require('../enums');

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    res.status(400).json(enums.password.isNull);
  } else if (password.length < 6) {
    res.status(400).json(enums.password.isSmall);
  } else {
    next();
  }
};

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const pattern = new RegExp(/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/, 'i');
  if (!email || email === '') {
    res.status(400).json(enums.email.isNull);
  } else if (!pattern.test(email)) {
    res.status(400).json(enums.email.isInvalid);
  } else {
    next();
  }
};

module.exports = {
  checkPassword,
  checkEmail,
};

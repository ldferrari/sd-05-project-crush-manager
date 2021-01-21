const Joi = require('@hapi/joi');
const generateToken = require('../auth/generate-token');

const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email()
    .required(),
  password: Joi.string().min(3)
    .max(64)
    .required(),
});

const loginValidate = (req, _res, next) => {
  const { error } = LOGIN_SCHEMA.validate(req.query);
  if (error) next(error);
  req.data = { token: generateToken() };
  next();
};

module.exports = { loginValidate };

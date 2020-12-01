const { nameIsValid, ageIsValid, dateIsValid } = require('../models/crushModel');

const setCrush = (req, res, next) => {
  const { name, age, date } = req.body;
  const nameWorks = nameIsValid(name);
  const ageWorks = ageIsValid(age);
  const dateWorks = dateIsValid(date);

  if (!nameWorks) {
    return res.status(400).json(nameWorks.message);
  }
  if (!ageWorks) {
    return res.status(400).json(ageWorks.message);
  }
  if (!dateWorks) {
    return res.status(400).json(dateWorks.message);
  }
  return next();
};

module.exports = { setCrush };

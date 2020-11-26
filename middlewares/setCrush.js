const { nameIsValid, ageIsValid, dateIsValid } = require('../models/crushValidation')

const setCrush = (req, res, next) => {
  const { name, age, date } = req.body;
  const nameWorks = nameIsValid(name);
  const ageWorks = ageIsValid(age);
  const dateWorks = dateIsValid(date);

  if (nameWorks.message) {
    return res.status(400).json(nameWorks);
  }
  if (ageWorks.message) {
    return res.status(400).json(ageWorks);
  }
  if (dateWorks.message) {
    return res.status(400).json(dateWorks);
  }
  return next(console.log());
};

module.exports = { setCrush };

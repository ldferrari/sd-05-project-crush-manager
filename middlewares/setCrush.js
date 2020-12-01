const { nameIsValid, ageIsValid, dateIsValid } = require('../models/crushModel');

const setCrush = (req, res, next) => {
  const { name, age, date } = req.body;
  const nameWorks = nameIsValid(name);
  const ageWorks = ageIsValid(age);
  const dateWorks = dateIsValid(date);
  console.log(name);
  console.log(nameWorks);
  console.log("Essa linha do ageworks", ageWorks);
  

  if (nameWorks.message) {
    return res.status(400).json({ message: nameWorks.message });
  }
  if (ageWorks.message) {
    return res.status(400).json({ message: ageWorks.message });
  }
  if (dateWorks.message) {
    return res.status(400).json({ message: dateWorks.message });
  }
  return next();
};

module.exports = { setCrush };

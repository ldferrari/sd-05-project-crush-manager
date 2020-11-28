const { crush, crushDate } = require('../enums');

const dataPattern = new RegExp(/(\d{2})\/(\d{2})\/(\d{4})/);

const checkCrushName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json(crush.nullName);
  }
  if (name.length < 3) {
    return res.status(400).json(crush.smallName);
  }
  next();
};

const checkCrushAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json(crush.noAge);
  }
  if (parseInt(age, 10) < 18) {
    return res.status(400).json(crush.nullAge);
  }
  next();
};

const checkCrushDate = (req, res, next) => {
  const { date: reqDate } = req.body;
  if (!reqDate || !reqDate.datedAt || reqDate.rate === undefined) {
    console.log('oi', reqDate);
    return res.status(400).json(crushDate.isNull);
  }
  if (!dataPattern.test(reqDate.datedAt)) {
    return res.status(400).json(crushDate.isDatedAtInvalid);
  }
  if (![1, 2, 3, 4, 5].includes(parseInt(reqDate.rate, 10))) {
    return res.status(400).json(crushDate.isRateInvalid);
  }
  next();
};

module.exports = {
  checkCrushName,
  checkCrushAge,
  checkCrushDate,
};

// regex pego no stackoverflow
// https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
const dateReg = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

module.exports = (req, res, next) => {
  if (!req.body.date) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  const { datedAt, rate } = req.body.date;
  if (!datedAt || rate === undefined) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (!datedAt.match(dateReg)) {
    return res.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  return next();
};

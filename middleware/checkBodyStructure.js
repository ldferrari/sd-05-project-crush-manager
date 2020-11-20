const validateDate = (data) => {
  const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  return re.test(String(data).toLowerCase());
};

//  checa se o json enviado via body atende os requisitos.
module.exports = (req, res, next) => {
  const { name, age, date } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  const numberAge = parseInt(age, 10);

  if (numberAge < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return res.status(400).json(
      {
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      },
    );
  }

  if (!validateDate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  const numberRate = parseInt(date.rate, 10);

  if (!(numberRate >= 1 && numberRate <= 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

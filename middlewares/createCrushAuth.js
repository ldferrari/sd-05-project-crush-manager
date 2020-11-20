module.exports = (req, _res, next) => {
  const { body } = req;
  const { name, age, date } = body;
  const token = req.header('authorization');

  const hasKey = (obj, key) => {
    const result = Object.keys(obj).includes(key);
    console.log(result);
    return result;
  };
  if (token === undefined) {
    return next({ message: 'Token não encontrado', status: 401 });
  }
  if (token.length !== 16) {
    return next({ message: 'Token inválido', status: 401 });
  }
  if (!hasKey(body, 'name') || name.length === 0) {
    return next({ message: 'O campo "name" é obrigatório', status: 400 });
  }
  if (name.length < 3) {
    return next({ message: 'O "name" deve ter pelo menos 3 caracteres', status: 400 });
  }
  if (!hasKey(body, 'age') || !String(age).match(/^\d+$/) || String(age).length === 0) {
    return next({ message: 'O campo "age" é obrigatório', status: 400 });
  }
  if (age < 18) {
    return next({ message: 'O crush deve ser maior de idade', status: 400 });
  }
  if (
    !hasKey(body, 'date')
    || !hasKey(date, 'datedAt')
    || !hasKey(date, 'rate')
    || date.length === 0
    || date.datedAt.length === 0
    || String(date.rate).length === 0
  ) {
    return next({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      status: 400,
    });
  }
  if (!date.datedAt.match(/^(0[1-9]|[12][0-9]|3[01])[- /.]/)) {
    return next({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"', status: 400 });
  }
  if (!String(date.rate).match(/^[1-5]$/)) {
    return next({ message: 'O campo "rate" deve ser um inteiro de 1 à 5', status: 400 });
  }
  next();
};

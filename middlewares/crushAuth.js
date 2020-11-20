module.exports = (req, _res, next) => {
  const { name, age, date } = req.body;
  const token = req.header('Authorization');

  if (name === undefined || name.length === 0) {
    return next({ message: 'O campo "name" é obrigatório', status: 400 });
  }
  if (name.length < 3) {
    return next({ message: 'O "name" deve ter pelo menos 3 caracteres', status: 400 });
  }
  if (!age.toString().match(/^\d+$/) || age === undefined || age.length === 0) {
    return next({ message: 'O campo "age" é obrigatório', status: 400 });
  }
  if (age < 18) {
    return next({ message: 'O crush deve ser maior de idade', status: 400 });
  }
  if (!date.datedAt.match(/^(0[1-9]|[12][0-9]|3[01])[- /.]/)) {
    return next({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"', status: 400 });
  }
  if (!date.rate.toString().match(/^[1-5]$/)) {
    return next({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"', status: 400 });
  }
  if (
    date === undefined ||
    date.length === 0 ||
    date.datedAt === undefined ||
    date.datedAt.length === 0 ||
    date.rate === undefined ||
    date.rate.length === 0
  ) {
    return next({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      status: 400,
    });
  }
  if (token === undefined) {
    return next({ message: 'Token não encontrado', status: 401 });
  }
  if (token.toString().length < 16) {
    return next({ message: 'Token inválido', status: 401 });
  }
  next();
};

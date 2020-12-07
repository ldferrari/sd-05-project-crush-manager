module.exports = (crush) => {
  if (!crush.name) return { isValid: false, message: 'O campo "name" é obrigatório' };
  if (crush.name.length < 3) return { isValid: false, message: 'O "name" deve ter pelo menos 3 caracteres' };
  if (!crush.age) return { isValid: false, message: 'O campo "age" é obrigatório' };
  if (crush.age < 18) return { isValid: false, message: 'O crush deve ser maior de idade' };
  if (!crush.date || !crush.date.datedAt || (!crush.date.rate && crush.date.rate !== 0)) return { isValid: false, message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' };
  if (crush.date.rate < 1 || crush.date.rate > 5) return { isValid: false, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  if (!/^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/.test(crush.date.datedAt)) return { isValid: false, message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };

  return { isValid: true };
};

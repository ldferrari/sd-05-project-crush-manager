const password = {
  isNull: { message: 'O campo "password" é obrigatório' },
  isSmall: { message: 'A "senha" deve ter pelo menos 6 caracteres' },
};

const email = {
  isNull: { message: 'O campo "email" é obrigatório' },
  isInvalid: { message: 'O "email" deve ter o formato "email@email.com"' },
};

const crush = {
  nullName: {
    message: 'O campo "name" é obrigatório',
  },
  smallName: {
    message: 'O "name" deve ter pelo menos 3 caracteres',
  },
  noAge: {
    message: 'O campo "age" é obrigatório',
  },
  nullAge: {
    message: 'O crush deve ser maior de idade',
  },
  notFound: {
    message: 'Crush não encontrado',
  },
  crushRemoved: { message: 'Crush deletado com sucesso' },

};

const crushDate = {
  isDatedAtInvalid: {
    message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
  },
  isNull: {
    message:
      'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  },
  isRateInvalid: {
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  },
};
const token = {
  notFound: {
    message: 'Token não encontrado',
  },
  isInvalid: {
    message: 'Token inválido',
  },
};

const encoding = {
  utf8: 'utf-8',
};

module.exports = { password, email, crush, crushDate, token, encoding };

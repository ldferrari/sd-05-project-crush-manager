/* REQUISITO 2
- A requisição deve ter o token de autenticação nos headers.
- O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
- O campo age deverá ser um inteiro e apenas pessoas com 18 anos ou mais podem ser cadastrados.
Ele é obrigatório.
*/

module.exports = async (req, res, next) => {
  // função para fazer verificação regex da data
  const checkDate = (date) => {
    const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    return re.test(String(date));
  };

  const { name, age, date } = req.body;

  // requisitos de verificação do nome
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  // requisitos de verificação da idade
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  // requisitos de verificação da data
  if (!date || !date.datedAt || date.rate === undefined) {
    return res
      .status(400)
      .json({
        message:
          'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
  }
  if (!checkDate(date.datedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return next();
};

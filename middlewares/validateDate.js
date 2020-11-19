module.exports = (req, res, next) => {
  const regexDate = /(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;

  if (!req.body.date || !req.body.date.datedAt || !req.body.date.rate) {
    res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (req.body.date.datedAt.match(regexDate)) {
    if (req.body.date.rate >= 1 && req.body.date.rate <= 5) {
      next();
    } else {
      res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  } else {
    res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const { readJSON } = require('../services/allCrush');

// https://expressjs.com/pt-br/guide/using-middleware.html
module.exports = async (req, res) => {
  const crushListId = await readJSON();
  const crushIdFind = crushListId.find((crush) => parseInt(req.params.id, 10) === crush.id);
  if (crushIdFind) {
    res.status(200).json(crushIdFind);
  }
  res.status(404).json({ message: 'Crush não encontrado' });
};

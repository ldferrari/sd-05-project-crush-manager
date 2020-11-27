const fs = require('fs').promises;

module.exports = async (req, res) => {
  const crushes = JSON.parse(await fs.readFile('./crush.json', 'utf-8', (error, response) => {
    if (error) {
      return console.log('Não foi possível acessar a lista de crushes');
    }
    return response;
  }));
  const crushed = crushes.find((crush) => crush.id === Number(req.params.id));
  if (!crushed) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(crushed);
};

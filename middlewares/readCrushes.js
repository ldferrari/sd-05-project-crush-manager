const fs = require('fs').promises;

module.exports = async (_req, res) => {
  const crushes = JSON.parse(await fs.readFile('./crush.json', 'utf-8', (error, response) => {
    if (error) {
      return console.log('Conteúdo não encontrado', error);
    }
    return response;
  }));
  return crushes ? res.status(200).json(crushes) : res.status(200).json([]);
};

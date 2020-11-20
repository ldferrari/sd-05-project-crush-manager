const fs = require('fs');
const util = require('util');

const searchId = util.promisify(fs.readFile);

module.exports = async (req, res) => {
  let file = await searchId('./crush.json', 'utf8');
  file = JSON.parse(file);
  const resposta = file.filter((item) => item.id === parseInt(req.params.id, 10));
  if (resposta.length === 0) {
    return res.status(404).json({
      message: 'Crush não encontrado',
    });
  }
  res.status(200).json(resposta[0]);
};

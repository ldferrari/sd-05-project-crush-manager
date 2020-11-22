const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = async (req, res) => {
  const { id } = req.params;

  let file = await readFile('./crush.json', 'utf8');

  file = JSON.parse(file);
  const out = file.filter((item) => item.id !== parseInt(id, 10));

  await writeFile('./crush.json', JSON.stringify(out));

  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

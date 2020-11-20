const fs = require('fs').promises;
const path = require('path');

const readCrushs = async () => {
  const list = await fs.readFile((path.resolve(__dirname, '..', 'crush.json')), 'utf8', (err, _data) => {
    if (err) console.log('erro no read');
    console.log('lido a Lista');
  });
  return JSON.parse(list.toString('utf-8'));
};

const getAllCrushs = async (req, res) => {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  const crushList = await readCrushs();
  res.status(200).send(crushList);
};

module.exports = getAllCrushs;

const fs = require('fs').promises;
const path = require('path');

const readCrushs = async () => {
  const list = await fs.readFile((path.resolve(__dirname, '..', 'crush.json')), 'utf8', (err, _data) => {
    if (err) console.log('erro no read');
    console.log('lido a Lista');
  });
  return JSON.parse(list.toString('utf-8'));
};

const queryCrushs = async (req, res) => {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  const crushList = await readCrushs();
  const queryName = req.query.q;
  // console.log(req.query);
  const queryResponse = crushList.filter((crush) => crush.name.includes(queryName));
  if (!queryResponse || queryResponse.length === 0) {
    return res.status(404).json({ message: 'nome não encontrado' });
  }
  res.status(200).send(queryResponse);
};

module.exports = queryCrushs;

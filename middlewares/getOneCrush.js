const fs = require('fs').promises;
const path = require('path');

const readCrushs = async () => {
  const list = await fs.readFile((path.resolve(__dirname, '..', 'crush.json')), 'utf8', (err, _data) => {
    if (err) console.log('erro no read');
    console.log('lido a Lista');
  });
  return JSON.parse(list.toString('utf-8'));
};

const getOneCrush = async (req, res) => {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  const crushList = await readCrushs();
  const givenId = req.params.id;
  const numId = parseInt(givenId, 10);
  // console.log(numId);
  const oProcurado = crushList.find((crush) => crush.id === numId);
  if (!oProcurado) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  // console.log(oProcurado);
  res.status(200).send(oProcurado);
};

module.exports = getOneCrush;

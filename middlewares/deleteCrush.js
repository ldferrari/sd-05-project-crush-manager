const fs = require('fs').promises;
const path = require('path');

const readCrushs = async () => {
  const list = await fs.readFile((path.resolve(__dirname, '..', 'crush.json')), 'utf8', (err, _data) => {
    if (err) console.log('erro no read');
    console.log('lido a Lista');
  });
  return JSON.parse(list.toString('utf-8'));
};

const deleteCrush = async (req, res) => {
  try {
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
    const listSemId = crushList.filter((crush) => crush.id !== numId);
    // console.log(listSemId)
    fs.writeFile((path.resolve(__dirname, '..', 'crush.json')), JSON.stringify(listSemId), (err, _data) => {
      if (err) throw ('erro escrever', err.message);
      console.log('deletado o crush');
    });
    res.status(200).send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    console.log('linha34');
  }
};

module.exports = deleteCrush;

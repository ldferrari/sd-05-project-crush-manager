const fs = require('fs').promises;
const path = require('path');

const readCrushs = async () => {
  const list = await fs.readFile((path.resolve(__dirname, '..', 'crush.json')), 'utf8', (err, _data) => {
    if (err) console.log('erro no read');
    console.log('lido a Lista');
  });
  return JSON.parse(list.toString('utf-8'));
};

const editCrush = async (req, res) => {
  try {
    const crushList = await readCrushs();
    const givenId = req.params.id;
    const numId = parseInt(givenId, 10);
    // console.log(numId);
    const listSemId = crushList.filter((crush) => crush.id !== numId);
    // console.log(listSemId)
    const { name, age, date } = req.body;
    const editedCrush = { id: numId, name, age, date };
    // console.log(editedCrush);
    const newList = [...listSemId, editedCrush];
    // console.log(newList);
    fs.writeFile((path.resolve(__dirname, '..', 'crush.json')), JSON.stringify(newList), (err, _data) => {
      if (err) throw ('erro escrever', err.message);
      console.log('atualizado o crush');
    });
    res.status(200).send(editedCrush);
  } catch (error) {
    console.log('linha31');
  }
};

module.exports = editCrush;

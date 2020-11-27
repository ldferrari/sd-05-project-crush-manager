const fs = require('fs').promises;
const { encoding } = require('../enums');

const crushFile = './crush.json';

const readCrush = async () => {
  const rawData = await fs.readFile(crushFile, encoding.utf8);
  const data = await JSON.parse(rawData);
  const lastId = data.map(({ id }) => id).sort()[data.length - 1];
  return { data, lastId };
};

const createCrush = async (newCrush) => {
  const { lastId, data: oldData } = await readCrush();
  const newCrushToCreate = { ...newCrush, id: lastId + 1 };
  const newData = oldData.push(newCrushToCreate);
  await fs.writeFile(crushFile, JSON.stringify(newData), (err) => {
    if (err) {
      console.log(err);
      return null;
    }
    console.log('Success on file write!');
  });
  return newCrushToCreate;
};

module.exports = { readCrush, createCrush };

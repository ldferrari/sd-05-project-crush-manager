const fs = require('fs').promises;
const { encoding } = require('../enums');

const crushFile = './crush.json';

const writeCrushFile = async (data) => {
  await fs.writeFile(crushFile, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      return null;
    }
    console.log('arquivo criado com sucesso');
  });
  return true;
};

const readCrush = async (crushId = null) => {
  const rawData = await fs.readFile(crushFile, encoding.utf8);
  const data = JSON.parse(rawData);
  if (crushId && data) {
    const result = data.find(
      (crush) => parseInt(crush.id, 10) === parseInt(crushId, 10),
    );
    return result;
  }
  return data;
};

const createCrush = async (newCrush) => {
  const oldData = await readCrush();
  const newCrushToCreate = { ...newCrush, id: oldData.length + 1 };
  const newData = [...oldData, newCrushToCreate];
  await writeCrushFile(newData);
  return newCrushToCreate;
};

const deleteCrush = async (crushId) => {
  const data = await readCrush();
  const idxToRemove = data.indexOf(data.find((crush) => crush.id === crushId));
  data.splice(idxToRemove, 1);
  await writeCrushFile(data);
  return true;
};

const editCrush = async (crushToEdit) => {
  const data = await readCrush();
  const crushIndex = data.indexOf(
    data.find(
      (crush) => parseInt(crush.id, 10) === parseInt(crushToEdit.id, 10),
    ),
  );
  data.splice(crushIndex, 1, crushToEdit);
  await writeCrushFile(data);
  return crushToEdit;
};

const findCrush = async (crushParam) => {
  const data = await readCrush();
  const term = new RegExp(`${crushParam}`);
  const searchData = data.filter((crush) => term.test(crush.name));
  return searchData || [];
};

module.exports = { readCrush, createCrush, editCrush, deleteCrush, findCrush };

const getCrushFile = require('./file/get');
const saveCrushFile = require('./file/save');

const addNewEntryToFile = (file, newEntrie) => {
  const parsedFile = JSON.parse(file);

  parsedFile.push(newEntrie);

  return parsedFile;
};

module.exports = (crushToBeCreated) => getCrushFile().then((crushFile) => {
  const newCrushFile = addNewEntryToFile(crushFile, crushToBeCreated);
  saveCrushFile(newCrushFile);
});

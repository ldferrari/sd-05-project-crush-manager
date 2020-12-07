const getCrushFile = require('./file/get');
const saveCrushFile = require('./file/save');

const removeEntryFromFile = (file, idToRemove) => {
  const parsedFile = JSON.parse(file);

  const filteredFile = parsedFile.filter((entry) => entry.id !== idToRemove);

  return filteredFile;
};

module.exports = (crushIdToRemove) => getCrushFile().then((crushFile) => {
  const newCrushFile = removeEntryFromFile(crushFile, crushIdToRemove);
  saveCrushFile(newCrushFile);
});

const getCrushFile = require('./file/get');
const saveCrushFile = require('./file/save');

const editEntryFromFile = (file, newEntry, idToEdit) => {
  const parsedFile = JSON.parse(file);

  const filteredFile = parsedFile.filter((entry) => entry.id !== idToEdit);

  const editedFile = filteredFile.push({ id: idToEdit, ...newEntry });

  return editedFile;
};

module.exports = (crushIdToEdit, newCrushObject) => getCrushFile().then((crushFile) => {
  const newCrushFile = editEntryFromFile(crushFile, newCrushObject, crushIdToEdit);
  saveCrushFile(newCrushFile);
});

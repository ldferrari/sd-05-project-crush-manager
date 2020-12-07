const getCrushFile = require('./file/get');
const saveCrushFile = require('./file/save');

const editEntryFromFile = (file, newEntry, idToEdit) => {
  const { name, age, date } = newEntry;
  const parsedFile = JSON.parse(file);

  const indexToEdit = parsedFile.indexOf((entry) => Number(entry.id) === Number(idToEdit));

  parsedFile[indexToEdit] = {
    name,
    age,
    date,
    id: Number(idToEdit),
  };

  return parsedFile;
};

module.exports = (crushIdToEdit, newCrushObject) => getCrushFile().then((crushFile) => {
  const newCrushFile = editEntryFromFile(crushFile, newCrushObject, crushIdToEdit);
  saveCrushFile(newCrushFile);
});

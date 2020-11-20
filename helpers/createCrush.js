const fs = require('fs').promises;
const path = require('path');
const { createProfile } = require('./createProfile');
const { readCrush } = require('./readCrush');

const createCrush = async (crushToCreate, idCrush) => {
  const file = await readCrush();
  const sort = file.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });
  const id = sort[0].id + 1;
  const crush = idCrush ? createProfile(crushToCreate, idCrush) : createProfile(crushToCreate, id);
  const newFile = [...file, crush];
  await fs.writeFile(path.resolve(__dirname, '../crush.json'), JSON.stringify(newFile, null, 2), 'utf-8');
  return crush;
};

module.exports = {
  createCrush,
};

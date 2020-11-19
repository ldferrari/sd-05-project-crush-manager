const fs = require('fs');
const path = require('path');

const crushDB = fs.readFileSync(
  path.join(__dirname, '../crush.json'),
  'utf8',
);

const replaceCrushDB = async (newDB) => {
  await fs.writeFileSync(
    path.join(__dirname, '../crush.json'),
    JSON.stringify(newDB),
    'utf8',
  );
};

const getCrushDB = async () => JSON.parse(await crushDB);

const getCrushById = async (id) => JSON
  .parse(await crushDB)
  .filter(({ id: crushId }) => Number(crushId) === Number(id));

const getCrushByQuery = async (q) => JSON
  .parse(await crushDB)
  .filter(({ name }) => name.includes(q));

const getCrushLastId = () => JSON
  .parse(crushDB)
  .reduce((id, current) => (id > current.id ? id : current.id), 0);

const updateCrushById = async (id, updatedCrush) => {
  const crushList = JSON
    .parse(await crushDB)
    .map((crush) => (crush.id === Number(id)
      ? { ...updatedCrush, id: Number(id) } : crush));
  await replaceCrushDB(crushList);
  return { ...updatedCrush, id: Number(id) };
};

const registerCrush = async (crush) => {
  const crushList = await getCrushDB() || [];
  const id = getCrushLastId() + 1;
  crushList.push({ ...crush, id });
  await replaceCrushDB(crushList);
  return { ...crush, id };
};

module.exports = {
  registerCrush,
  updateCrushById,
  getCrushDB,
  getCrushById,
  getCrushByQuery,
  getCrushLastId,
};

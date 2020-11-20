const fs = require('fs').promises;

const readList = async () => {
  const readFile = await fs.readFile('./crush.json', 'utf-8');
  const list = await JSON.parse(readFile);
  console.log(list);
  return list;
};

// const writeList = async (preview, new) => {
//   const writeFile = await fs.writeFile('./crush.json', JSON.stringify([...preview, new]));
//   return writeFile;
// }

module.exports = async (req, res, next) => {
  const { name, age, date } = req.body;
  const previewList = await readList();
  const id = previewList.length + 1;
  const newCrush = { id, name, age, date };
  const newCrushList = [...previewList, newCrush];
  fs.writeFile('./crush.json', JSON.stringify(newCrushList));
  // console.log(newList);
  return res.status(201).json({ id, name, age, date });
};

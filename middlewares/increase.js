const fs = require('fs').promises;

const { readList } = require('../services');

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const previewList = await readList();
  const id = previewList.length + 1;
  const newCrushList = [...previewList, { id, name, age, date }];
  fs.writeFile('./crush.json', JSON.stringify(newCrushList));
  return res.status(201).json({ id, name, age, date });
};

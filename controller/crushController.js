/* eslint-disable no-useless-catch */
/* eslint-disable linebreak-style */
const readFile = require('../service/readFile');
const writeFile = require('../service/writeFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;
  console.log(readFile);

  try {
    const crushs = await readFile();
    const id = crushs.length + 1;
    await writeFile([...crushs, { id, name, age, date }]);
    res.status(201).json({ id, name, age, date });
  } 
  catch (err) {
    throw err;
  }
};

// const getCrushById = async (req, res) => {
//   const { id: idNumber } = req.params;
// };

module.exports = { createCrush };

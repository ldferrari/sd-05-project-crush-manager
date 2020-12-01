// const readFile = require('../service/readFile');
// const writeFile = require('../service/writeFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;

  try {
    // const crushs = await readFile();
    // const id = crushs.length + 1;
    // await writeFile([...crushs, { id, name, age, date }]);
    console.log('Ponto aqui');
    res.status(201).json();
  } 
  catch (err) {
    throw err;
  }
};

// const getCrushById = async (req, res) => {
//   const { id: idNumber } = req.params;
// };

module.exports = { createCrush };

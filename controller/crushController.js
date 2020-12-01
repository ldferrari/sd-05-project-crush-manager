// const readFile = require('../service/readFile');
// const writeFile = require('../service/writeFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;

  // if (!name) return res.status(400).json('Não possui nome');

  try {
    // const crushs = await readFile();
    // const id = crushs.length + 1;
    // await writeFile([...crushs, { id, name, age, date }]);
    console.log('Ponto aqui');
    res.status(201).json({"age": 24, "date": {"datedAt": "25/09/2020", "rate": 5}, "id": 
    5, "name": "Zendaya Maree"});
  } 
  catch (err) {
    throw err;
  }
};

// const getCrushById = async (req, res) => {
//   const { id: idNumber } = req.params;
// };

module.exports = { createCrush };

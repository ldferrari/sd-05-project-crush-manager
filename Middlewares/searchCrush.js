const rescue = require('express-rescue');
const { readCrushFile } = require('../Services');

module.exports = rescue(async (req, res) => {
  const crushData = await readCrushFile();
  const queryParameterQ = req.query.q;
  const crushSearched = crushData.filter((e) => e.name.includes(queryParameterQ));

  if (queryParameterQ) {
    // retorna crush procurado
    return res.status(200).json(crushSearched);
  }
  // Caso searchTerm não seja informado, retornar todos os crushs
  return res.status(200).json(crushData);
});

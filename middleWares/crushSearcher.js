const fs = require('fs').promises;

const readCrushs = async () => {
  const crushs = await fs.readFile('crush.json', 'utf-8', (err) => {
    if (err) throw console.log('não dá mais');
  });
  return JSON.parse(crushs);
};

module.exports = async (req, res) => {
  const searchCrush = req.query.q;
  const crushList = await readCrushs();
  if (!searchCrush || searchCrush === '') return res.status(200).json(crushList);
  const results = crushList.filter((crush) => crush.name.includes(searchCrush));
  res.status(200).json(results);
};
/* // GET /search?q=tobi+ferret *referência tirada direto do expressjs*
console.dir(req.query.q)
// => 'tobi ferret' */

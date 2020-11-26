const { readList } = require('../services');

module.exports = async (req, res) => {
  const crushList = await readList();
  console.log(crushList);
  const leach = req.query.q;
  const crushFound = crushList.filter((crush) => crush.name.includes(leach));
  if (crushFound) return res.status(200).json(crushFound);
  return res.status(404).json({ crushList });
};

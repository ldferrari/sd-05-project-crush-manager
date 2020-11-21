const getAllCrushs = require('./getAllCrushs');

const checkQuery = (req, res, next) => {
  const { q: searchTerm } = req.query;
  if (!searchTerm) {
    getAllCrushs(req, res);
  }
  next();
};

module.exports = checkQuery;

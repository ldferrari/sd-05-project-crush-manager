const data = require('../crush.json');

function findUser(userID) {
  const index = data.some((user) => user.id === userID);
  return index;
}

module.exports = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const acharUsuario = findUser(id);
  if (acharUsuario) {
    return next();
  }
  res.status(404).json({
    message: `Crush não encontrado ${req.body.id}`,
  });
};

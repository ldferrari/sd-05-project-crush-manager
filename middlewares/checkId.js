const data = require('../crush.json');

function findUser(userID) {
  const index = data.some((user) => user.id === userID);
  return index;
}

module.exports = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  console.log(typeof id);
  const acharUsuario = findUser(id);
  console.log(acharUsuario);
  if (acharUsuario) {
    return next();
  }
  console.log(`${id} oooooooooooooo`);
  console.log(acharUsuario);
  console.log(data);
  res.status(404).json({
    message: 'Crush não encontrado',
  });
};

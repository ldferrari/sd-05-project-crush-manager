const readF = require('./fs/readF');

const path = './crush.json';
function findUser(userID) {
  return readF(path)
    .then((user) => JSON.parse(user).some((e) => parseInt(e.id, 10) === userID))
    .catch(() => console.log('entrou aqui no erro'));
}

// function findUser(userID) {
//   const index = data.some((user) => user.id === userID);
//   return index;
// }

module.exports = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const acharUsuario = await findUser(id);
  if (acharUsuario) {
    return next();
  }
  return res.status(404).json({
    message: 'Crush não encontrado',
  });
};

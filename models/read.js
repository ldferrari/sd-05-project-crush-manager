const getCrushFile = require('./file/get');

module.exports = (crushIdToRead = null) => getCrushFile().then((crushFile) => {
  if (!crushIdToRead) return JSON.parse(crushFile);

  return JSON.parse(crushFile).find((crush) => Number(crush.id) === Number(crushIdToRead));
});

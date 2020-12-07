const getCrushFile = require('./file/get');

module.exports = (crushIdToRead = null) => getCrushFile((crushFile) => {
  if (!crushIdToRead) return JSON.parse(crushFile);

  return JSON.parse(crushFile).find((crush) => crush.id === crushIdToRead);
});

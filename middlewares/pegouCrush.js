const fs = require('fs').promises;

module.exports = async (_req, res) => {
  const crushs = JSON.parse(
    await fs.readFile('./crush.json', 'UTF-8', (err, data) => {
      if (err) {
        return console.log('Deu ruim', err);
      }
      return data;
    }),
  );
  return crushs ? res.status(200).json(crushs) : res.status(200).json([]);
};

const fs = require('fs');

module.exports = async (path) => {
  const file = await fs.writeFile(
    path.join(path),
    'utf8',
    (err, fileData) => {
      if (err) return err;
      return fileData;
    },
  );

  return JSON.parse(file);
};

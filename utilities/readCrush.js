const fs = require('fs');

function readCrush(files) {
  return new Promise((res, rej) => {
    fs.readFile(files, (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
}

module.exports = {
  readCrush,
};

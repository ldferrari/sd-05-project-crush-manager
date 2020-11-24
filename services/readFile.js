const fs = require('fs');

module.exports = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, content) => {
      if (err) return reject(err);
      resolve(content.toString());
    });
  });

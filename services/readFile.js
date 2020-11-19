const fs = require('fs');

// module.exports = async (path) => {
//   await fs.readFile(path, (err, content) => {
//     if (err) return console.error(`Erro ao ler o arquivo: ${err.message}`);
//     // console.log(content.toString('utf8'));
//     return content.toString('utf8');
//   });
// };

module.exports = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, content) => {
      if (err) return reject(err);
      resolve(content.toString('utf8'));
    });
  });

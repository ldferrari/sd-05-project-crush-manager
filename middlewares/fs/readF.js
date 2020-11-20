const fs = require('fs');

const readOI = function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
};

module.exports = readOI;

// function readFile(fileName) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(fileName, 'utf8', (error, data) => {
//       if (error) return reject(error);
//       resolve(data);
//     });
//   });
// }
// const readOI = async function run() {
//   await readFile('./crush.json');
//   return JSON.parse(readFile);
// };

// module.exports = readOI;

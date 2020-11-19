const fs = require('fs');

module.exports = async (path, newCrushFile) => {
  await fs.writeFile(path, JSON.stringify(newCrushFile), (err) => {
    if (err) return console.log(err);
    // console.log('File updated successfully');
  });
};

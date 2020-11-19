const randtoken = require('rand-token');
const fs = require('fs').promises;

function createToken() {
  const token = randtoken.generate(16);
  return { token };
}

function validateEmail(email) {
  const re = /^[^@]+@[^@]+\.[^@]+$/;
  return re.test(String(email).toLowerCase());
} // returns true or false
// ref regex https://stackoverflow.com/questions/742451/what-is-the-simplest-regular-expression-to-validate-emails-to-not-accept-them-bl

function validatePassword(password) {
  if (password.length > 5) {
    return true;
  }
  return false;
}

function checkDatedAt(data) {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return re.test(String(data));
}

const readCrushFile = async () => {
  const crushData = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(crushData);
};

const addNewCrushOnFile = async (allCrushes, oldCrushes, newCrush) => {
  if (allCrushes) {
    return fs.writeFile('./crush.json', JSON.stringify(allCrushes));
  }
  const newCrushes = [...oldCrushes, newCrush];
  await fs.writeFile('./crush.json', JSON.stringify(newCrushes));
};

module.exports = {
  createToken,
  validateEmail,
  validatePassword,
  checkDatedAt,
  readCrushFile,
  addNewCrushOnFile,
};

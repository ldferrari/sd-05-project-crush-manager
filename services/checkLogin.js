// Fonte regex: https://stackoverflow.com/questions/742451/what-is-the-simplest-regular-expression-to-validate-emails-to-not-accept-them-bl
function checkEmail(email) {
  const re = /^[^@]+@[^@]+\.[^@]+$/;
  return re.test(String(email).toLowerCase());
} // Retorna true or false

function checkPassword(password) {
  if (password.length > 5) {
    return true;
  }
  return false;
}

module.exports = { checkEmail, checkPassword };

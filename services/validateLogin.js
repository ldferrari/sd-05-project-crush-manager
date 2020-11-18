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

module.exports = { validateEmail, validatePassword };

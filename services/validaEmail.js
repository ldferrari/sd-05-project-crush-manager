module.exports = (email) => {
  const regEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i;
  return regEmail.test(String(email).toLowerCase());
};

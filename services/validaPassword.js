module.exports = (password) => {
  if (password.length > 5) {
    return true;
  }
  return false;
};

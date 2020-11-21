// Referência:
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// https://regexr.com/3e48o

const emailValidator = (email) => {
  const validationRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return validationRegex.test(String(email).toLowerCase());
};

module.exports = emailValidator;

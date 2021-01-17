// Validação do email por regex no formado "email@email.com"
function checkEmail(email) {
  const validRegex = (/^.+@.+.(.{3}|.{2})$/);
  // const validRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
  return validRegex.test(String(email).toLowerCase());
} // Retorna true or false

// se senha for menor que 5 caracte - requisito - 1
function checkSenha(password) {
  if (password.length > 5) {
    return true;
  }
  return false;
}

module.exports = { checkEmail, checkSenha };

// Stackoverflow: simple regex pattern for email
// regex: https://stackoverflow.com/questions/50330109/simple-regex-pattern-for-email
// https://www3.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html

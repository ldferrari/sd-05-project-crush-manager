const auth = require('./auth');
// const criarCrush = require('./criarCrush');
// const todosCrush = require('./todosCrush');
// const editarCrush = require('./editarCrush');
const validarCrush = require('./validarCrush');
// const deletaCrush = require('./deletaCrush');
// const retornaCrush = require('./retornaCrush');
// const searchTerm = require('./searchTerm');
const gerarToken = require('./gerarToken');
const loginValidator = require('./loginValidator');

module.exports = {
  auth,
  // criarCrush,
  // todosCrush,
  // searchTerm,
  // editarCrush,
  // deletaCrush,
  validarCrush,
  // retornaCrush,
  gerarToken,
  loginValidator,
};

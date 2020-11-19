function checkDatedAt(data) {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return re.test(String(data));
}
// pacote moment era outra opção para verificar formato de data

module.exports = checkDatedAt;

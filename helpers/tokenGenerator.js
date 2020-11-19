function tokenGenerator(length) {
  const caractersAllowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(
    '',
  );
  const tokenGenerated = [];
  for (let index = 0; index < length; index += 1) {
    const caracterIndex = (
      Math.random() * (caractersAllowed.length - 1)
    ).toFixed(0);
    tokenGenerated[index] = caractersAllowed[caracterIndex];
  }
  return tokenGenerated.join('');
}

module.exports = {
  tokenGenerator,
};

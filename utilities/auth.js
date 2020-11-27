module.exports = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) res.send({ message: 'missing token' });
};

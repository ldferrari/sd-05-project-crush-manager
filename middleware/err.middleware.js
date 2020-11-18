module.exports = (_err, _req, res, _next) => {
  const { message } = _err;
  res.status(400).json({ message });
};

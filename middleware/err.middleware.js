module.exports = (_err, _req, res, _next) => {
  const { message: m } = _err;
  res
    .status(m.split(';')[1] || 400)
    .json({ message: m.split(';')[0] });
};

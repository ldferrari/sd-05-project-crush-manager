module.exports = (err, req, res, _next) => {
  res.status(err.status).json(err.message);
}
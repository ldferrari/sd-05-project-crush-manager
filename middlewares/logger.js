module.exports = (req, res, next) => {
  req.startTime = Date.now();
  console.log(`[${req.method}] ${req.path}`);
  next();
};

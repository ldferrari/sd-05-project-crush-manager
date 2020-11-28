module.exports = (req, res, next) => {
  const { id } = req.params;
  if (id === undefined) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  next();
};

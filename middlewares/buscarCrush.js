const fs = require('fs').promises;

module.exports = async (req, res) => {
  const crushBuscado = Number(req.params.id);
  const listCrush = JSON.parse(await fs.readFile('crush.json', 'UTF8', (err, data) => {
    if (err) {
      return console.log('Deu ruim');
    }
    return data;
  }));
  const crushCerto = listCrush.find((e) => e.id === crushBuscado);
  if (!crushCerto) {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).json(crushCerto);
};

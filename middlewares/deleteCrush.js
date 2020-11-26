const fs = require('fs').promises;

module.exports = async (req, res) => {
  const crushBuscado = Number(req.params.id);
  const listCrush = JSON.parse(
    await fs.readFile('crush.json', 'UTF8', (err, data) => {
      if (err) {
        return console.log('Deu ruim');
      }
      return data;
    }),
  );
  const crushCerto = listCrush.find((e) => e.id === crushBuscado);
  const crushFiltered = listCrush.filter((e) => crushCerto !== e);
  await fs.writeFile(
    'crush.json',
    JSON.stringify(crushFiltered),
    'UTF8',
    (err) => {
      if (err) {
        return console.log('Deu ruim');
      }
      return crushFiltered;
    },
  );

  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

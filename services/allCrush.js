// metodo 'filesystem = fs' promise = assincrono
const fs = require('fs').promises;
// const newArry = require('../middlewares/updateCrush');

// Ler e transforma a './crush.json' em objeto
const readJSON = async () => {
  const getCrushJSON = await fs.readFile('./crush.json', 'utf-8');
  const tratadoGetCrushJSON = JSON.parse(getCrushJSON);
  return tratadoGetCrushJSON;
};

// Adiciona newCrush e transforma a './crush.json' em string novamente
const incrementJSON = async (req, res) => {
  const { name, age, date } = req.body;
  const revisaoReadJSON = await readJSON();
  const id = revisaoReadJSON.length + 1;
  const newCrushReadJSON = [...revisaoReadJSON, { id, name, age, date }];
  fs.writeFile('./crush.json', JSON.stringify(newCrushReadJSON));
  return res.status(201).json({ id, name, age, date });
};

module.exports = { readJSON, incrementJSON };

const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');
const middlewares = require('./middlewares');

const fs = require('fs').promises;

const { tokenVal, nameVal, ageVal, dateVal } = middlewares.addCrush;

const PORT = 3000;
const app = express();
app.use(bodyparse.json());

app.post('/login', middlewares.login, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({
    token,
  });
});

app.post('/crush', tokenVal, nameVal, ageVal, dateVal, async (req, res, _next) => {
  const { name, age, date } = req.body;

  const dataJSON = await fs.readFile('./crush.json', 'utf-8');
  const data = (JSON.parse(dataJSON));
  const id = 1 + data.reduce((max, actual) => {
    console.log(actual.id, max);
    return (actual.id > max ? actual.id : max);
  }, 0);
  const newCrush = { name, age, id, date };
  data.push(newCrush);
  await fs.writeFile('./crush.json', JSON.stringify(data), 'utf-8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
  return res.status(201).json(newCrush);
});

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

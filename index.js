const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');
const {
  middleWareAge,
  middleWareDate,
  middleWareId,
  middleWareLogin,
  middleWareName,
  middleWareToken,
  usingFiles,
} = require('./middleWares');

const app = express();
app.use(bodyparse.json());
const PORT = 3000;

app.post('/login', middleWareLogin.login, (_req, res, _next) =>
  res.status(200).json({
    token: crypto.randomBytes(8).toString('hex'),
  }));

app.get('/crush', middleWareToken, async (_req, res, _next) => {
  const returnData = await usingFiles.readFile();
  res.status(200).json(returnData);
});

app.get('/crush/search', middleWareToken, async (req, res, _next) => {
  const datas = await usingFiles.readFile();
  const found = await datas.filter((data) => data.name.includes(req.query.q));
  console.log(datas);
  console.log(req.query);
  res.status(200).json(found);
});

app.get('/crush/:id', middleWareToken, middleWareId, async (req, res, _next) => {
  const { id } = req.params;
  const crushArr = await usingFiles.readFile();
  const crushFound = crushArr.find((crush) => crush.id === Number(id));
  if (crushFound === undefined) {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).json(crushFound);
});

app.put(
  '/crush/:id',
  middleWareId,
  middleWareAge,
  middleWareDate,
  middleWareName,
  middleWareToken,
  async (req, res, _next) => {
    const { id } = req.params;
    const crushArr = await usingFiles.readFile();
    const crushFound = crushArr.find((crush) => crush.id === parseInt(id, 10));

    if (crushFound === undefined) {
      return res.status(404).json({ message: 'Crush não encontrado' });
    }

    crushFound.name = req.body.name;
    crushFound.age = req.body.age;
    crushFound.date.datedAt = req.body.date.datedAt;
    crushFound.date.rate = req.body.date.rate;

    const remainCrushs = crushArr.filter((crush) => !crush.id === id);
    /* const remainCrushs = crushArr.filter((crush) => {
      if (crush.id !== id) return crush;
    }) */

    remainCrushs.push(crushFound);

    await usingFiles.updateFile(remainCrushs);
    return res.status(200).json(crushFound);
  },
);

app.delete('/crush/:id', middleWareId, middleWareToken, async (req, res, _next) => {
  const { id } = req.params;
  const crushArr = await usingFiles.readFile();
  /*     const crushFound = crushArr.find((crush) => {
      return crush.id === Number(id);
    }); */
  const crushLeftOvers = crushArr.filter((crush) => crush.id !== Number(id));
  await usingFiles.updateFile(crushLeftOvers);
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.post(
  '/crush',
  middleWareToken,
  middleWareName,
  middleWareAge,
  middleWareDate,
  async (req, res, _next) => {
    const crushObj = await usingFiles.writeFile(req.body);
    res.status(201).json(crushObj);
  },
);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));

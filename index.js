const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./Middlewares');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

// Mater debugger
// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

// 1 - Crie o endpoint POST /login
app.post('/login', middlewares.login);

// 6 - delete
app.delete('/crush/:id', middlewares.authToken, middlewares.deleteCrush);

// 2 - Crie o endpoint POST /crush
app
  .route('/crush')
  .post(
    middlewares.authToken,
    middlewares.validateCrush,
    middlewares.addNewCrush,
  )
  .get(
    // 3 - Crie o endpoint GET /crush
    middlewares.authToken,
    middlewares.getAllCrushes,
  );

// 7 - Search
app.get('/crush/search', middlewares.searchCrush);
// 4 - Crie o endpoint GET /crush/:id
app
  .route('/crush/:id')
  .get(middlewares.authToken, middlewares.getCrushById)
  // 5 - Crie o endpoint PUT /crush/:id
  .put(
    middlewares.authToken,
    middlewares.validateCrush,
    middlewares.updateCrushById,
  );

app.listen(PORT, () => console.log(`We're in. Port ${PORT}`));

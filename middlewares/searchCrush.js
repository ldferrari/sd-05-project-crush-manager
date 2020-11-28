/* REQUISITO 7:
O endpoint deve retornar um array de crushs que contenham em seu nome o termo pesquisado no
queryParam da URL. Deve retornar o status 200. Caso searchTerm não seja informado ou esteja vazio,
o endpoint devera retornar um array com todos os crushs cadastrados, assim como no endpoint
GET /crush com um status 200. Caso nenhum crush satisfaça a busca, o endpoint deve retornar o
status 200 e um array vazio. A requisição deve ter o token de autenticação nos headers.
(verificação do token foi feita no middleware anterior)
*/

const { readCrush } = require('../services/crud');

module.exports = async (req, res) => {
  const searchTerm = req.query.q;
  const allCrushes = await readCrush();
  const searchResult = allCrushes.filter((crush) => crush.name.includes(searchTerm));
  if (!searchResult || searchResult === '') {
    res.status(200).json(allCrushes);
  } else if (searchResult.length === 0) {
    res.status(200).json([]);
  } else {
    res.status(200).json(searchResult);
  }
};

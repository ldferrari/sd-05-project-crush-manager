const fs = require('fs').promises;

const fsMiddleware = async () => {
  const datas = await fs.readFile('./crush.json', 'utf-8', (err, data) => {
    if (err) throw err;
    return data || [];
  });
  return JSON.parse(datas);
};

/* const fsMiddleware = async (_req, res, _next) => {
  await fs.readFile('./crush.json', 'utf-8', (err, data) => {
    if (err) throw err;
    if (!data) return res.status(200).json([]);
    res.status(200).json({
      data,
    });
  });
}; */

module.exports = fsMiddleware;

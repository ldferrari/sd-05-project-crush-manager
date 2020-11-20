const express = require('express');
const axios = require('axios');


const app = express();

function tokenIsValid(token) {
 const regToken = /^[A-z0-9]{12}/;

 if (!token || !regToken.test(token)) {
  console.log("Token inválido");
 }
 return regToken.test(token);  
};

app.get('/btc/price', async (req, res) => {
  const token = req.headers.authorization;
  console.log("token aqui", token);
  const tokenChecked = tokenIsValid(token);
  console.log("token checado", tokenChecked);
  if (tokenChecked) {
    const api = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
    const dataApi = await axios.get(api).then(({ data }) => data);
    return res.json({ dataApi });
  }
  else {
    return res.json('Senha incorreta');
  }
});


app.listen(3000, () => console.log('Estamos bem'));

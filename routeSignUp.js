const express = require('express'); // importanto o express
const route = express.Router(); // importação do Router() (já esta no pacote padrão)
const crypto = require('crypto') // importação do crypto - gera o token da requisição [npm i crypto-js]

// primeira função para retornar um token aleatório de 16 caracteres
function gerandoToken() { // randomBytes cria um token aleatório
  return crypto.randomBytes(8).toString('hex');
};

const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

function validacaoEmail(email) { // test() - retorna um valor booleano pegando como referencia o regexEmail | String() - transforma em string
  return regexEmail.test(String(email).toLowerCase());
};

const validacaoData = body => body.email && body.password; // verificando se os campos email e password existem (true)

route.post('/', async(req, res) => { // fazendo a união da rota raiz para a rota /login
  if(!validacaoData(req.body)) {
    return res.status(400).json({"message": "missing data"})
  };

  const token = gerandoToken();

  const { email, password } = req.params; // desestruturando as propriedades
  if(email === null || email === "") {
    return res.status(400).json({"message": "O campo \"email\" é obrigatório"})
  } else if(!validacaoEmail(email)) {
    return res.status(400).json({"message": "O \"email\" deve ter o formato \"email@email.com\""})
  } else if(password === null || password === "") {
    return res.status(400).json({"message": "O campo \"password\" é obrigatório"})
  } else if(password.length < 6) {
    return res.status(400).json({"message": "A \"senha\" deve ter pelo menos 6 caracteres"})
  };
  
  return res.status(200).json({ token });
});

module.exports = route;

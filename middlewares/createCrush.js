// requisito 2
//  cria um novo crush ao arqurivo (./incrementCrush) = crush.json
// {
//   "name": "Keanu Reeves",
//   "age": 56,
//   "date": {
//     "datedAt": "22/10/2019",
//     "rate": 5
//   }
// }
// O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
// Caso o campo não seja passado ou esteja vazio retorne um código de status 400,
// com o seguinte corpo:
// {
//   "message": "O campo \"name\" é obrigatório"
// }
// Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400,
// com o seguinte corpo:
// {
//   "message": "O \"name\" deve ter pelo menos 3 caracteres"
// }
// O campo age deverá ser um inteiro e apenas pessoas maiores de idade
// (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.

// {
//   "message": "O campo \"age\" é obrigatório"
// }
// Caso o crush não tenha pelo menos 18 anos retorne status 400, com o seguinte corpo:

// {
//   "message": "O crush deve ser maior de idade"
// }

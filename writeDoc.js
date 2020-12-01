const { writeFile } = require('fs');

writeFile('crush.json', 'conteúdo do arquivo', err => {
  
  if(err) return console.log(err);

  console.log('arquivo criado com sucesso!');
}); 
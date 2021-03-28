//const fs = require('fs');
//const path = require('path');
const bcrypt = require('bcrypt');
let hash = bcrypt.hashSync("1234", 10);

console.log(bcrypt.compareSync("1234", hash));



//let caminhoArquivo = path.join('prova.txt')

//fs.writeFileSync(caminhoArquivo, "Sorte a minha")

//let conteudo = fs.readFileSync(caminhoArquivo, {encoding: 'utf-8'})


//console.log(conteudo)





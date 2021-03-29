const fs = require ('fs');
const router = require('../routes');

function logSite(req, res, next) {
     fs.appendFileSync('log.txt', "O usuario entrou na url:" + req.url)
     next();
}


module.exports = logSite


//TESTE DE EXERCÍCIO APAGAR QUANDO TERMINAR 





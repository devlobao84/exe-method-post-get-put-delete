const fs = require ('fs');
const router = require('../routes');

function logDB(req, res, next) {
     fs.appendFileSync('logDB.txt', "Foi criado um registro pela url:" + req.url)
     next();
}


module.exports = logDB
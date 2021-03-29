const fs = require ('fs');
const router = require('../routes');

function logPROD(req, res, next) {
     fs.appendFileSync('logPROD.txt', "Foi criado um produto novo pela url:" + req.url)
     next();
}


module.exports = logPROD
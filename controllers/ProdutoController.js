//Aplicações de módulos
 const fs = require('fs');
 const path = require('path');

//Lógica para viewForm -  Controller de produtos 

          const produtosJson = path.join("produtos.json")
          let ProdutoController = {
          viewForm:(req, res) =>{
               return res.render('produto');
          },
// Lógica para salvar dados no form do produto 

          salvarForm:(req, res) => {
          let { nomeProdutos, precoProdutos } = req.body          
          //salvar no banco 
          
          let dadosJson = JSON.stringify([{nome:nomeProdutos, preco:precoProdutos}])
          fs.writeFileSync(produtosJson, dadosJson)
          res.redirect('/produtos/sucesso');


//res.send("O produto: " + nomeProdutos + " foi criado cm sucesso");
// Neste caso o "res.send" imprimir na tela a mensagem  seter sua própria view (rota)
/*Como está ativado o res.redirect('/produtos/sucesso'), ao cadastrar um novo produto,
será redirecionado apra a view
(rota/página) de sucesso*/
          },

// View de  confirmação 
          sucesso:(req, res) => {
          return res.render('sucesso')
          }, 

//Editar produtos 
          viewAttForm:(req, res) => {
          let {id} = req.params 
          let produtos = [
               {id:1, nome:"produto novo", preco: 50},
               {id:2, nome:"produto usado", preco: 20},
               {id:3, nome:"produto seminovo", preco: 10},
               {id:4, nome:"produto semiusado", preco: 50},
               {id:5, nome:"produto velho", preco: 10},
               {id:6, nome:"produto sujo", preco: 12},
          ];
          res.render('editarProduto', {produto: produtos[id]});
          },           

//View de confirmação da edição do produto 
          editar:(req, res) => {
          let { nomeProdutos, precoProdutos } = req.body;
          res.send("Você editou o produto novo para " + nomeProdutos + "com o preço " + precoProdutos);
     },


// Listar-deletar produtos 
     listarProdutos: (req, res) => {
         let produtos = fs.readFileSync(produtosJson, {encoding: 'utf-8'})
         produtos = JSON.parse(produtos)
          res.render('listaprodutos', {listaProdutos:produtos})
     },

// Listar-deletar produtos
    deletarProduto:(req, res)=>{
         let {id} = req.params

         res.send("Estou deletando o produto com o id: "+id)
    }
}

 module.exports = ProdutoController; 




let ProdutoController = {
     viewForm:(req, res) =>{
          return res.render('produto');
     },
     salvarForm:(req, res) => {
          let { nomeProdutos, precoProdutos } = req.body

          res.redirect('/produtos/sucesso');

          //res.send("O produto: " + nomeProdutos + " foi criado cm sucesso");
     },

     // View de  conformação 
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

          //res.send("Eu quero editar o produto" + id); 
     }, 

     //View de confirmação apra edição de produtos  
     editar:(req, res) => {
          let { nomeProdutos, precoProdutos } = req.body;
          res.send("Você editou o produto novo para " + nomeProdutos)
     },

     // Listar-deletar produtos 
     listarProdutos: (req, res) => {
         let produtos = [
               {id:1, nome:"produto novo", preco: 50},
               {id:2, nome:"produto usado", preco: 20},
               {id:3, nome:"produto seminovo", preco: 15},
               {id:4, nome:"produto semiusado", preco: 50},
               {id:5, nome:"produto velho", preco: 10},
               {id:6, nome:"produto sujo", preco: 12},
               
          ];

          res.render('listaprodutos', {listaProdutos:produtos})
          
     },

    deletarProduto:(req, res)=>{
         let {id} = req.params

         res.send("Estou deletando o produto com o id: "+id)
    }
}


module.exports = ProdutoController; 
const express = require('express');

const router = express.Router();

const pool = require('../database/index');

router.use(function(req,res,next){
    next();
})

router.get('/',(req,res)=>{
    res.send('rota do produto');
})





//buscar todos
router.get('/products',(req,response)=>{

  pool.query('SELECT * FROM products', (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          //return response.status(200).render().json(res.rows)
          response.json(res.rows)
      }
  }); 
})

//buscar por parametro
router.get('/products/:id',(req,response)=>{

  const id = parseInt(req.params.id);
  
  pool.query('SELECT * FROM products WHERE user_id = $1', [id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          //return response.status(200).render().json(res.rows)
          response.json(res.rows)
      }
  }); 
})

// criar novo
router.post('/products',(req,response)=>{
  
  const {title, price, company, info, incart, count, total } = req.body;
  
  pool.query('INSERT INTO products(title, price, company, info, incart, count, total)VALUES ($1, $2, $3, $4, $5, $6, $7)',
  [title, price, company, info, incart, count, total], (err,res)=>{
    if (err) {
        console.log(err.message)
        //console.log(JSON.stringify(err))
      } else {
          return response.status(200).send({message: 'registrado com sucesso'})
      }
  });
})

router.post('/products/:id',(req,response)=>{

  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query('UPDATE products SET name= $1 WHERE product_id=$2',
  [name, id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          return response.status(200).send({message: 'atualizado com sucesso'})
      }
  });
})

router.delete('/products/:id',(req,response)=>{

  const id = parseInt(req.params.id);

  pool.query('DELETE FROM products WHERE product_id=$1',
  [id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          return response.status(200).send({message: 'deletado com sucesso'})
      }
  });
})


module.exports = router;
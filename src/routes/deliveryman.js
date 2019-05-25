const express = require('express');

const router = express.Router();

const pool = require('../database/index');

router.use(function(req,res,next){
    next();
})

router.get('/',(req,res)=>{
    res.send('rota de entregador');
})





//buscar todos
router.get('/deliverers',(req,response)=>{

  pool.query('SELECT * FROM deliverers', (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          //return response.status(200).render().json(res.rows)
          response.json(res.rows)
      }
  }); 
})

//buscar por parametro
router.get('/deliverers/:id',(req,response)=>{

  const id = parseInt(req.params.id);
  
  pool.query('SELECT * FROM deliverers WHERE deliveryman_id = $1', [id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          //return response.status(200).render().json(res.rows)
          response.json(res.rows)
      }
  }); 
})

// criar novo
router.post('/deliverers',(req,response)=>{
  
  const {title, price, company, info, incart, count, total } = req.body;
  
  pool.query('INSERT INTO deliverers(title, price, company, info, incart, count, total)VALUES ($1, $2, $3, $4, $5, $6, $7)',
  [title, price, company, info, incart, count, total], (err,res)=>{
    if (err) {
        console.log(err.message)
        //console.log(JSON.stringify(err))
      } else {
          return response.status(200).send({message: 'registrado com sucesso'})
      }
  });
})

router.post('/deliverers/:id',(req,response)=>{

  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query('UPDATE deliverers SET name= $1 WHERE deliveryman_id=$2',
  [name, id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          return response.status(200).send({message: 'atualizado com sucesso'})
      }
  });
})

router.delete('/deliverers/:id',(req,response)=>{

  const id = parseInt(req.params.id);

  pool.query('DELETE FROM deliverers WHERE deliveryman_id=$1',
  [id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          return response.status(200).send({message: 'deletado com sucesso'})
      }
  });
})


module.exports = router;
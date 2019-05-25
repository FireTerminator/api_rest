const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const pool = require('../database/index');

router.use(function(req,res,next){
  next();
})


//buscar todos
router.get('/',(req,response)=>{
  
  pool.query('SELECT * FROM users', (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          //return response.status(200).render().json(res.rows)
          response.json(res.rows)
      }
  }); 
})

//buscar por parametro
router.get('/:id',(req,response)=>{

  const id = parseInt(req.params.id);
  
  pool.query('SELECT * FROM users WHERE user_id = $1', [id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          //return response.status(200).render().json(res.rows)
          response.json(res.rows)
      }
  }); 
})

// criar novo
router.post('/', (req,response)=>{
  
  const { name, password,email } = req.body;
  

   pool.query('SELECT email FROM users WHERE email=$1', [email],
  (err,res)=>{
    if(err){
      return console.log(err.stack);
    } else if(res.rows[0]){
       return response.send({error: 'email já existe'});
       
    }
        const date = new Date();
        var hash = bcrypt.hashSync(password, 10);

        pool.query('INSERT INTO users(name,password,email, date) values($1,$2,$3,$4)',
        [name, hash, email, date], (err,res)=>{
          if (err) {
              return  console.log(err.stack)
            } else {
                return response.status(200).send({message: 'registrado com sucesso'})
            }
        });
  })
})

router.post('/:id',(req,response)=>{

  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query('UPDATE users SET name= $1 WHERE user_id=$2',
  [name, id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          return response.status(200).send({message: 'atualizado com sucesso'})
      }
  });
})

router.delete('/:id',(req,response)=>{

  const id = parseInt(req.params.id);

  pool.query('DELETE FROM users WHERE user_id=$1',
  [id], (err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
          return response.status(200).send({message: 'deletado com sucesso'})
      }
  });
})


module.exports = router;
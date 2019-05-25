const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const pool = require('../database/index');

router.use(function(req,res,next){
  next();
})

router.post('/authenticate/users', (req,response)=>{
  
    const { name, password,email } = req.body;
    
  
     pool.query('SELECT email, password FROM users WHERE email=$1', [email],
    (err,res)=>{
      if(err){
        return console.log(err.stack);
      } else if(res.rowCount === 0 ){
        return response.status(400).send({message: 'email não existe'})
         
      }else{response.send('ok')}
      
  
          
    })
  })

  module.exports = router;
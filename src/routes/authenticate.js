const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const router = express.Router();

const pool = require('../database/index');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret,{
    expiresIn:86400
  });
}


router.use(function(req,res,next){
  next();
})

router.post('/authenticate/users', async (req,response)=>{
  
    const {password, email } = req.body;
    
  
     await pool.query('SELECT user_id, email, password FROM users WHERE email=$1', [email],
    (err,res)=>{
      if(err){
        return console.log(err.stack);
      } else if(res.rowCount === 0 ){
        return response.status(400).send({message: 'email não encontrado'})
         
      }else {
        //response.json( Object.keys(res.rows[0]))
        const userPassword = Object.values(res.rows[0])[2]
        const user_id = Object.values(res.rows[0])[0]
        console.log(user_id);

        bcrypt.compare(password,userPassword).then((result)=>{
          if(result){
            console.log("authentication successful")
            //return response.status(200).send({message: 'autenticação realizada'})
          } else {
            console.log("authentication failed. Password doesn't match")
            return response.status(400).send({message: 'falha na autenticação'})
          
          }
        })
        .catch((err)=>console.error(err)) 
        
        return response.json({
          token:generateToken({id: user_id})
        });
      }       
    })
  })

  module.exports = router;
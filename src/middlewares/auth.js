const jwt = require ('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
       return res.status(401).send({error: 'Nenhum token informado'});
    }
    //formato esperado= Bearer hdalhsodh231312dldh2hl31çbe12bg3u21
    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({error: 'Erro Token'})
    }
    //scheme deve ter a palavar Bearer e o token o token dah
    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Token mal formatado'})
    }
    //decoded vai posssuir o id do usuario caso o o token estiver correto
     jwt.verify(token, authConfig.secret, (err,decoded)=>{
        if(err) return res.status(401).send({error: 'Token invalido'});

        req.user_id = decoded.id;
        return next();
     })  
    
}
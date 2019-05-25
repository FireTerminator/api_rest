const express = require ('express'); // framework para node, faz tratativas de rotas e requests http
const bodyParser = require('body-parser');// node entenda as requisições receber em json e entender os parametros vindos da url 
var cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));// entender os parametros vindo de url

/*so para testar* /
app.get('/', (req, res) => {
    res.send('ok');
});
/**/

//const authRouter = require('./controllers/authController');
const authenticateRouter = require('./routes/authenticate');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product')

//app.use('/', authRouter );
app.use('/', authenticateRouter );
app.use('/users', userRouter );
app.use('/', productRouter );
require ('./database/index');
app.listen(3001);






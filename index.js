const  express = require('express');
const  mustacheExpress = require('mustache-express');
const db = require('./src/db');




const app = express();



app.engine('html',mustacheExpress());
app.set('view engine','html');
app.set('views',__dirname+'/src/views');

app.use(express.urlencoded({extended: true}));

app.use('/',require('./src/routes/homeRoutes'));

const app_porta = 8000;

db.sync({}).then(() => {
    console.log('conexao ok');
}).catch((error) => {
    console.log('conexao off')
});
app.listen(app_porta,function(){
    console.log("App Rodando na porta"+app_porta+"!!");
})
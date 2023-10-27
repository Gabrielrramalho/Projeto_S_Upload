const Sequelize  = require('sequelize');

const sequelize = new Sequelize('S_Upload', 'adminG', '28161700' , {
    host: 'supload.c5txwypshumw.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306,
    logging: false,
});

sequelize.authenticate().then(() => {
    console.log('Conexão ao banco de dados estabelecida com sucesso.')
}).catch((err) => {
    console.error('Erro ao conectar ao banco de dados: ', err)
});

module.exports = sequelize;
const Sequelize = require('sequelize');
const db = require('../db');


const Pessoa = db.define('Pessoa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Pessoa.sync({ force: true }) // Este comando irá sincronizar o modelo e criar a tabela, cuidado ao usar "force: true"
    .then(() => {
        console.log('Modelo sincronizado com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o modelo:', error);
    });


module.exports = Pessoa;
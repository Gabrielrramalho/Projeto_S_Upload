const Sequelize = require('sequelize');
const db = require('../db.js');

const Documento = db.define('Documentos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: Sequelize.STRING
  },
  caminho: {
    type: Sequelize.STRING
  }
});


Documento.sync({ force: true }) // Este comando irá sincronizar o modelo e criar a tabela, cuidado ao usar "force: true"
  .then(() => {
    console.log('Modelo sincronizado com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo:', error);
  });

// Resto do código

module.exports = Documento;

const express = require('express');
const routes = express.Router();

const uploadController = require('../controllers/uploadController');


routes.get('/upload', uploadController.uploadView);
routes.post('/send', uploadController.enviarArquivo2);
routes.get('/ver/:nomeArquivo',uploadController.abrirArquivo);

module.exports = routes;

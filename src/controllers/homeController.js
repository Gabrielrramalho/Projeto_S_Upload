const Pessoa = require('../models/pessoa');

function homeView(req, res) {
    res.render('home.html', {});
}

module.exports = {
    homeView
};
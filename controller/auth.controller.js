md5 = require('js-md5');
var db = require('../db');

module.exports.login = function(req, res) {
    res.render('auth/login');
}

module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email: email }).value();

    if (!user) {
        res.render('auth/login', {
            errors: [
                'Email does not exist.'
            ],
            values: req.body
        });
        return;
    }
    var hasPassword = md5(password);
    if (user.password !== hasPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userID', user.id);
    res.redirect('/users');
};
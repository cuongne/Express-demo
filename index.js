const express = require("express");
const app = express();
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middleware/auth.middleware');
const port = 3000;


var db = require('./db');


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.set('view engine', 'pug');
app.get('/', function(req, res) {
    res.render('index')
});

app.use(express.static('public'));
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
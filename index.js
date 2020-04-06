const express = require("express");
const app = express();

var userRoute = require('./routes/user.route');

const port = 3000;


var db = require('./db');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.get('/', function(req, res) {
    res.render('index')
});

app.use(express.static('public'));
app.use('/users', userRoute);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
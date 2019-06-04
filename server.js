var express = require("express");

var path = require("path");

var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//! SESSION


var session = require('express-session');

app.use(session({
    secret: 'root',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))



//! GET
app.get('/', function (req, res) {
    if (req.session.counter) {
        req.session.counter += 1;
    } else {
        req.session.counter = 1;
    }

    const count = req.session.counter;
    console.log(req.session.counter);
    res.render("index", {
        count
    });
})

//! POST

app.post('/add',
    function (req, res) {
        console.log("POST DATA", req.body);
        req.session.counter += 1;
        res.redirect("/");
    })

app.post('/reset',
    function (req, res) {
        console.log("POST DATA", req.body);
        req.session.counter = 0;
        res.redirect("/");
    })


//! Console Log Server
app.listen(8000, function () {
    console.log("listening on port 8000");
});
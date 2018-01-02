var express = require ('express');
    mongoose = require('mongoose');
    bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://localhost/libraryApp_test');
else{
     db = mongoose.connect('mongodb://localhost/libraryApp');
}
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT  || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);


app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function (req,res) {
    res.send("Welcome to my API, Goto /api/books to get all the Books");
    });

app.listen(port, function () {
    console.log("Gulp is Running my app on port:" + port);
})

module.exports = app;
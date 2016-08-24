var express = require('express');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var app = express();

//mongoose setup
mongoose.connect('mongodb://localhost/travelphotoapp');

var photoSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    created: {type: Date, default: Date.now}
});

var Photo = new mongoose.model('Photo', photoSchema);

//app setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));

//routes

//listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});
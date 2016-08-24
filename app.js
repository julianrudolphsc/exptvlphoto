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

var Photo = mongoose.model('Photo', photoSchema);

//bullshit test add here
// Photo.create({
//     title: "Test Photo",
//     image: "https://farm4.staticflickr.com/3953/15613249585_d1e45f2ee5.jpg",
//     description: "Blah blah blah, description here",
// }, function(err){
//     if(err){
//         console.log("Error creating Bullshit");
//     }else{
//         console.log('New entry created!');
//     }
// });

//app setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));

//routes

//listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});
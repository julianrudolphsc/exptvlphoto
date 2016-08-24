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


//app setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));

//routes
//redirect / to /photos
app.get('/', function(req, res){
    res.redirect('/photos');
});

//INDEX
app.get('/photos', function(req, res){
    Photo.find({}, function(err, photos){
        if(err){
            console.log(err);
        }else{
            res.render('index', {photos: photos});
        }
    });
});

//NEW /photos/new
app.get('/photos/new', function(req, res){
    res.render('new');
});

//CREATE
app.post('/photos', function(req, res){
    //create 
    Photo.create(req.body.photo, function(err, newPhoto){
        if(err){
            console.log("Error at CREATE");
        }else{
            res.redirect('/photos');
        }
    });
    //redirect
});

//listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});
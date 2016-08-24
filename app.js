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
app.use(methodOverride('_method'));

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
});

//SHOW
app.get('/photos/:id', function(req, res){
    Photo.findById(req.params.id, function(err, foundPhoto){
        if(err){
            console.log("Error in SHOW");
        }else{
            res.render('show', {photo: foundPhoto});
        }
    });
});

//EDIT
app.get('/photos/:id/edit', function(req, res){
    Photo.findById(req.params.id, function(err, foundPhoto){
        if(err){
            console.log("Error at edit");
        }else{
            res.render('edit', {photo: foundPhoto});
        }
    });
});

//UPDATE
app.put('/photos/:id', function(req, res){
    Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
        if(err){
            res.redirect('/');
        }else{
            res.redirect('/photos/'+req.params.id);
        }
    });
});

//DESTROY
app.delete('/photos/:id', function(req, res){
    Photo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/');
            console.log("error at delete");
        }else{
            res.redirect('/');
        }
    });
});

//listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
});
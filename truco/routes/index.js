var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();


var lodash = require('lodash');

var player_model = require("../models/player");
var game_model   = require("../models/game");
var game_card    = require("../models/card");

var Game = game_model.game;
var Card = game_card.card;
var Player = player_model.player;




/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { user : req.user ,idgame:req.idgame});
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.get('/jugar',function(req,res){
  console.log("entro al get /jugar");
  var id =req.query.idgame
  
  



  res.render('jugar',{idgame:req.query.idgame});



});


router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/newgame', function(req, res) {
    res.render('newgame', { });
});

router.post('/newgame', function(req, res) {
    
    var p1=new Player({name:req.body.nombrejug1});
    var p2=new Player({name:req.body.nombrejug2});
     

    var game = new Game ({
       player1:p1,
       player2:p2,
       rounds:[],
       currentHand:p1,
       currentRound:undefined,
       score:[0,0]
    });
    console.log("ANTES DEL NEWROUND");
    console.log(game);
  



    //game.currentRound.deal();
    console.log(game._id);    


    game.save(function(err,game){
     if(err){console.log(err);}
     if(!err){
      console.log('nuevo juego cargado');
     
      
      game.newRound().save(function(err,game){
      
        if(err){console.log(err);}

        if(!err){
          console.log("GUARDO EL GAME CON NEWROUND");
          console.log(game);
          console.log(game.currentRound.status);


          res.redirect('/jugar?idgame='+game._id);}       

    })
  
    
     
     }

    });




   
    



        
});




router.get('/login', function(req, res) {
    console.log(req.user);
    res.render('login', { user : req.user });
});

router.get('/ayuda', function(req, res) {
    res.render('ayuda');
});


router.post('/login', passport.authenticate('local'), function(req, res) {

    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;

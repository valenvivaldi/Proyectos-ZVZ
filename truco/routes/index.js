var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();


var lodash = require('lodash');

var player_model = require("../models/player");
var game_model   = require("../models/game");
var game_card    = require("../models/card");

var round_model = require("../models/round");

var Round = round_model.round;
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
  console.log(id);
  Game.findOne({_id:id},function(err,result){
    if(!err){
      console.log("JUEGO EN EL /PLAY ASDASDASDASDSADASASHDASDSJKHDSAKADSHJADKJSAHKSDAHKJSDAK");
      console.log(result);
      var carta1Jugador = './cartas/'+result.currentRound.currentTurn.cards[0].suit+'/'+result.currentRound.currentTurn.cards[0].number+'.jpg';
      var carta2Jugador='./cartas/'+result.currentRound.currentTurn.cards[1].suit+'/'+result.currentRound.currentTurn.cards[1].number+'.jpg';
      var carta3Jugador='./cartas/'+result.currentRound.currentTurn.cards[2].suit+'/'+result.currentRound.currentTurn.cards[2].number+'.jpg';
      //var carta1Jugador2= './cartas/'+result.currentRound.player2.cards[0].suit+'/'+result.currentRound.player2.cards[0].number+'.jpg';
      //var carta2Jugador2='./cartas/'+result.currentRound.player2.cards[1].suit+'/'+result.currentRound.player2.cards[1].number+'.jpg';
      //var carta3Jugador2='./cartas/'+result.currentRound.player2.cards[2].suit+'/'+result.currentRound.player2.cards[2].number+'.jpg';
      var estadoCantarEnvido= false;
      if(result.currentRound.jugadorCantoEnvido==undefined&&(result.currentRound.fsm.current='init'||result.currentRound.fsm.current='primer-carta')){estadoCantarEnvido=true};
      var estadoCantarTruco= false;
      if(result.currentRound.jugadorCantoTruco==undefined){estadoCantarTruco=true};

      res.render('jugar',{game:result,c1jt:carta1Jugador,c2jt:carta2Jugador,c3jt:carta3Jugador,penvido:result.currentRound.currentTurn.envidoPoints,estadoCantarEnvido:estadoCantarEnvido,estadoCantarTruco:estadoCantarTruco});
    }
  });


  



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
     

    







    var newround = new Round({
      currentTurn : p1,
      jugadorMano: p1,
      player1: p1,
      player2: p2,
      fsm:undefined,
      status: 'running',
      score: [0,0],
      cartasPrimerJugador: [],
      cartasSegundoJugador: [],
      jugadorCantoEnvido:undefined,
      jugadorCantoTruco:undefined,
      historialDeAcciones:[],
      winnerOfRound:undefined,
      ganadorPrimera:undefined,
      ganadorSegunda:undefined,
      ganadorTercera:undefined

    });

    
    newround.fsm=newround.newTrucoFSM();
    console.log(newround);
    var game = new Game ({
       player1:p1,
       player2:p2,
       rounds:[newround],
       currentHand:p1,
       currentRound:newround,
       score:[0,0]
    });
    
    console.log("ANTES DEL NEWROUND");
    console.log(game);
  



    game.currentRound.deal();
    console.log(game._id);    


    game.save(function(err,game){
     if(err){console.log(err);}
     if(!err){
      console.log('nuevo juego cargado');
      res.redirect('/jugar?idgame='+game._id);
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

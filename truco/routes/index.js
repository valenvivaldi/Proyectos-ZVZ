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


router.get('/joingame', function(req, res) {
    res.render('joingame', { });
});

router.post('/joingame',function(req,res){
    ///TEMPORALMENTE LE AGREGAMOS UN CAMPO OWNER AL GAME
    var dueno= req.body.owner;
    
  Game.findOne({owner:dueno,inicio:false},function(err,result){
      if(err){console.log(err)};
      
      if(!err){
        var paux= new Player(result.player2);
        paux.name=req.session.passport.user;
        
        result.player2=paux;
        result.inicio=true;
        var roundaux= new Round(result.currentRound);
        roundaux.player2=paux;
        result.currentRound=roundaux;
        

        result.save(function(err,result){
          if(err){console.log(err)}
          console.log(result);  
          if(!err){res.redirect('/jugar?idgame='+result._id);}

        });




        
      }

  });
});




router.get('/jugar',function(req,res){
  console.log(req.session.passport.user);//MUESTRA EL USUARIO
  var id =req.query.idgame;
  
  Game.findOne({_id:id},function(err,result){
    if(!err){
      if(result.currentRound.fsm.current=='estado-final'){
        if(result.score[0]>=30 || result.score[1]>=30){
          var winner;
          var p1=result.player1.name;
          var p2=result.player2.name;
          var puntosp1=result.currentRound.score[0];
          var puntosp2=result.currentRound.score[1];
          if(puntosp1 >=30){winner=p1};
          if(puntosp2 >=30){winner=p2};
        
          return res.render ('/winner',{winner:winner,p1:p1,p2:p2,puntosp1:puntosp1,puntosp2:puntosp2});

          




        };
        
        var p1 = new Player({name:result.player1.name});
        var p2 = new Player({name:result.player2.name});
        var rondanueva = new Round({

          currentTurn :result.switchPlayer(result.currentHand),
          jugadorMano: result.switchPlayer(result.currentHand),
          player1: p1,
          player2: p2,
          fsm:undefined,
          status: 'running',
          score: result.currentRound.score,
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
        
        rondanueva.deal();
        rondanueva.currentTurn=rondanueva.switchPlayer(result.currentHand);
        rondanueva.jugadorMano=rondanueva.switchPlayer(result.currentHand);

        rondanueva.fsm=rondanueva.newTrucoFSM('init'); 
        
        
        result.currentRound=rondanueva;
        result.rounds=result.rounds+rondanueva;

            var nombresesion=req.session.passport.user;
            console.log('1-NOMBRE DE SESION ES !!! '+nombresesion);
        result.save(function(err,result){
          if(err){console.log(err);}
          if(!err){
            var nombresesion=req.session.passport.user;
            console.log('NOMBRE DE SESION ES !!! '+nombresesion);
            var carta1Jugador;
            var carta2Jugador;
            var carta3Jugador;
            if(result.currentRound.currentTurn.cards[0]!=undefined){carta1Jugador = './cartas/'+result.currentRound.currentTurn.cards[0].suit+'/'+result.currentRound.currentTurn.cards[0].number+'.jpg';}
            if(result.currentRound.currentTurn.cards[1]!=undefined){carta2Jugador='./cartas/'+result.currentRound.currentTurn.cards[1].suit+'/'+result.currentRound.currentTurn.cards[1].number+'.jpg';}
            if(result.currentRound.currentTurn.cards[2]!=undefined){carta3Jugador='./cartas/'+result.currentRound.currentTurn.cards[2].suit+'/'+result.currentRound.currentTurn.cards[2].number+'.jpg';}
            
            var estadoCantarEnvido= false;
            if(result.currentRound.jugadorCantoEnvido==undefined&&(result.currentRound.fsm.current=='init'||result.currentRound.fsm.current=='primer-carta')){estadoCantarEnvido=true};
            var estadoCantarTruco= false;
            if(result.currentRound.jugadorCantoTruco==undefined){estadoCantarTruco=true};
            var jugadas11=undefined;
            var jugadas12=undefined;
            var jugadas13=undefined;
            var jugadas21=undefined;
            var jugadas22=undefined;
            var jugadas23=undefined;



            if(result.currentRound.cartasPrimerJugador[0]!=undefined){jugadas11 = './cartas/'+result.currentRound.cartasPrimerJugador[0].suit+'/'+result.currentRound.cartasPrimerJugador[0].number+'.jpg';}

            if(result.currentRound.cartasPrimerJugador[1]!=undefined){jugadas12='./cartas/'+result.currentRound.cartasPrimerJugador[1].suit+'/'+result.currentRound.cartasPrimerJugador[1].number+'.jpg';}
            if(result.currentRound.cartasPrimerJugador[2]!=undefined){jugadas13='./cartas/'+result.currentRound.cartasPrimerJugador[2].suit+'/'+result.currentRound.cartasPrimerJugador[2].number+'.jpg';}
            if(result.currentRound.cartasSegundoJugador[0]!=undefined){jugadas21= './cartas/'+result.currentRound.cartasSegundoJugador[0].suit+'/'+result.currentRound.cartasSegundoJugador[0].number+'.jpg';}
            if(result.currentRound.cartasSegundoJugador[1]!=undefined){jugadas22='./cartas/'+result.currentRound.cartasSegundoJugador[1].suit+'/'+result.currentRound.cartasSegundoJugador[1].number+'.jpg';}
            if(result.currentRound.cartasSegundoJugador[2]!=undefined){jugadas23='./cartas/'+result.currentRound.cartasSegundoJugador[2].suit+'/'+result.currentRound.cartasSegundoJugador[2].number+'.jpg';}

            var estadoQuiero=false;
            var estadoNoQuiero=false;
            if(result.currentRound.fsm.current=='envido'||result.currentRound.fsm.current=='truco'){estadoQuiero=true;estadoNoQuiero=true;}
            
			console.log('NOMBRE DE SESION ES !!! '+nombresesion);
            res.render('jugar',{usuario:nombresesion,game:result,c1jt:carta1Jugador,c2jt:carta2Jugador,c3jt:carta3Jugador,penvido:result.currentRound.currentTurn.envidopoints,estadoCantarEnvido:estadoCantarEnvido,estadoCantarTruco:estadoCantarTruco,jugadas11:jugadas11,jugadas12:jugadas12,jugadas13:jugadas13,jugadas21:jugadas21,jugadas22:jugadas22,jugadas23:jugadas23,estadoQuiero:estadoQuiero,estadoNoQuiero:estadoNoQuiero});                        
          };
        });

        };




if(result.currentRound.fsm.current!='estado-final'){
      var carta1Jugador;
      var carta2Jugador;
      var carta3Jugador;
      if(result.currentRound.currentTurn.cards[0]!=undefined){carta1Jugador = './cartas/'+result.currentRound.currentTurn.cards[0].suit+'/'+result.currentRound.currentTurn.cards[0].number+'.jpg';}
      if(result.currentRound.currentTurn.cards[1]!=undefined){carta2Jugador='./cartas/'+result.currentRound.currentTurn.cards[1].suit+'/'+result.currentRound.currentTurn.cards[1].number+'.jpg';}
      if(result.currentRound.currentTurn.cards[2]!=undefined){carta3Jugador='./cartas/'+result.currentRound.currentTurn.cards[2].suit+'/'+result.currentRound.currentTurn.cards[2].number+'.jpg';}
      
      var estadoCantarEnvido= false;
      if(result.currentRound.jugadorCantoEnvido==undefined&&(result.currentRound.fsm.current=='init'||result.currentRound.fsm.current=='primer-carta')){estadoCantarEnvido=true};
      var estadoCantarTruco= false;
      if(result.currentRound.jugadorCantoTruco==undefined){estadoCantarTruco=true};
      var jugadas11=undefined;
      var jugadas12=undefined;
      var jugadas13=undefined;
      var jugadas21=undefined;
      var jugadas22=undefined;
      var jugadas23=undefined;




      if(result.currentRound.cartasPrimerJugador[0]!=undefined){jugadas11 = './cartas/'+result.currentRound.cartasPrimerJugador[0].suit+'/'+result.currentRound.cartasPrimerJugador[0].number+'.jpg';}
      if(result.currentRound.cartasPrimerJugador[1]!=undefined){jugadas12='./cartas/'+result.currentRound.cartasPrimerJugador[1].suit+'/'+result.currentRound.cartasPrimerJugador[1].number+'.jpg';}
      if(result.currentRound.cartasPrimerJugador[2]!=undefined){jugadas13='./cartas/'+result.currentRound.cartasPrimerJugador[2].suit+'/'+result.currentRound.cartasPrimerJugador[2].number+'.jpg';}
      if(result.currentRound.cartasSegundoJugador[0]!=undefined){jugadas21= './cartas/'+result.currentRound.cartasSegundoJugador[0].suit+'/'+result.currentRound.cartasSegundoJugador[0].number+'.jpg';}
      if(result.currentRound.cartasSegundoJugador[1]!=undefined){jugadas22='./cartas/'+result.currentRound.cartasSegundoJugador[1].suit+'/'+result.currentRound.cartasSegundoJugador[1].number+'.jpg';}
      if(result.currentRound.cartasSegundoJugador[2]!=undefined){jugadas23='./cartas/'+result.currentRound.cartasSegundoJugador[2].suit+'/'+result.currentRound.cartasSegundoJugador[2].number+'.jpg';}

      var estadoQuiero=false;
      var estadoNoQuiero=false;
      if(result.currentRound.fsm.current=='envido'||result.currentRound.fsm.current=='truco'){estadoQuiero=true;estadoNoQuiero=true;}
      
            var nombresesion=req.session.passport.user;
            
      res.render('jugar',{usuario:nombresesion,nombrep2:result.player2.name,game:result,c1jt:carta1Jugador,c2jt:carta2Jugador,c3jt:carta3Jugador,penvido:result.currentRound.currentTurn.envidopoints,estadoCantarEnvido:estadoCantarEnvido,estadoCantarTruco:estadoCantarTruco,jugadas11:jugadas11,jugadas12:jugadas12,jugadas13:jugadas13,jugadas21:jugadas21,jugadas22:jugadas22,jugadas23:jugadas23,estadoQuiero:estadoQuiero,estadoNoQuiero:estadoNoQuiero});
  }  
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


router.post('/cantarEnvido', function(req, res) {
    Game.findOne({_id:req.body.idgame},function(err,result){
    	if(err){console.log(err)}
      if(!err){
        var p = result.currentRound.currentTurn.name;
        
        var ronda = new Round(result.currentRound);
        ronda.fsm=ronda.newTrucoFSM(ronda.fsm.current);
        result.currentRound=ronda;
       




        result.play(p,'envido');
        
        result.save(function(err,result){
          if(err){console.log(err)}

          if(!err){res.redirect('/jugar?idgame='+req.body.idgame);}

        });

      }


    });


});

router.post('/cantarTruco', function(req, res) {
    Game.findOne({_id:req.body.idgame},function(err,result){
      if(err){console.log(err)}
      if(!err){
        var p = result.currentRound.currentTurn.name;
        
        var ronda = new Round(result.currentRound);
        ronda.fsm=ronda.newTrucoFSM(ronda.fsm.current);
        result.currentRound=ronda;
        




        result.play(p,'truco');
        
        result.save(function(err,result){
          if(err){console.log(err)}

          if(!err){res.redirect('/jugar?idgame='+req.body.idgame);}

        });

      }


    });


});

router.post('/jugarcarta1', function(req, res) {
    Game.findOne({_id:req.body.idgame},function(err,result){
      if(err){console.log(err)}
      if(!err){
        var p = result.currentRound.currentTurn.name;
        
        var ronda = new Round(result.currentRound);
        ronda.fsm=ronda.newTrucoFSM(ronda.fsm.current);
        result.currentRound=ronda;
        



        var carta =result.currentRound.currentTurn.cards[0];
        result.play(p,'play-card',carta);
        
        result.save(function(err,result){
          if(err){console.log(err)}

          if(!err){res.redirect('/jugar?idgame='+req.body.idgame);}

        });

      }


    });


});

router.post('/jugarcarta2', function(req, res) {
    Game.findOne({_id:req.body.idgame},function(err,result){
      if(err){console.log(err)}
      if(!err){
        var p = result.currentRound.currentTurn.name;
        
        var ronda = new Round(result.currentRound);
        ronda.fsm=ronda.newTrucoFSM(ronda.fsm.current);
        result.currentRound=ronda;



        var carta =result.currentRound.currentTurn.cards[1];
        result.play(p,'play-card',carta);
        result.save(function(err,result){
          if(err){console.log(err)}

          if(!err){res.redirect('/jugar?idgame='+req.body.idgame);}

        });

      }


    });


});

router.post('/jugarcarta3', function(req, res) {
    Game.findOne({_id:req.body.idgame},function(err,result){
      if(err){console.log(err)}
      if(!err){
        var p = result.currentRound.currentTurn.name;
        
        var ronda = new Round(result.currentRound);
        ronda.fsm=ronda.newTrucoFSM(ronda.fsm.current);
        result.currentRound=ronda;
        console.log(ronda);



        var carta =result.currentRound.currentTurn.cards[2];
        result.play(p,'play-card',carta);
        result.save(function(err,result){
          if(err){console.log(err)}

          if(!err){res.redirect('/jugar?idgame='+req.body.idgame);}

        });

      }


    });


});



router.post('/quiero', function(req, res) {
    Game.findOne({_id:req.body.idgame},function(err,result){
      if(err){console.log(err)}
      if(!err){
        var p = result.currentRound.currentTurn.name;
        
        var ronda = new Round(result.currentRound);
        ronda.fsm=ronda.newTrucoFSM(ronda.fsm.current);
        result.currentRound=ronda;




        result.play(p,'quiero');
        result.save(function(err,result){
          if(err){console.log(err)}

          if(!err){res.redirect('/jugar?idgame='+req.body.idgame);}

        });

      }


    });


});

router.post('/no-quiero', function(req, res) {
    Game.findOne({_id:req.body.idgame},function(err,result){
      if(err){console.log(err)}
      if(!err){
        var p = result.currentRound.currentTurn.name;
        
        var ronda = new Round(result.currentRound);
        ronda.fsm=ronda.newTrucoFSM(ronda.fsm.current);
        result.currentRound=ronda;




        result.play(p,'no-quiero');
        result.save(function(err,result){
          if(err){console.log(err)}

          if(!err){res.redirect('/jugar?idgame='+req.body.idgame);}

        });

      }


    });


});







router.get('/newgame', function(req, res) {
    
    var p1=new Player({name:req.session.passport.user});
    var p2=new Player();
    

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
    var game = new Game ({
       owner:p1.name,
       player1:p1,
       player2:p2,
       inicio:false,
       rounds:[newround],
       currentHand:p1,
       currentRound:newround,
       score:[0,0]
    });
    
    
    game.currentRound.deal();
     


    game.save(function(err,game){
     if(err){console.log(err);}
     if(!err){
      res.redirect('/jugar?idgame='+game._id);
      }       

    });
});




   
    



        





router.get('/login', function(req, res) {
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

var expect = require("chai").expect;
var player_model = require("../models/player");
var game_model   = require("../models/game");
var game_card    = require("../models/card");

var Game = game_model.game;
var Card = game_card.card;
var Player = player_model.player;
describe('Game', function(done){
  

  it("saveloco",function(){
    var j1 = new Player('Bruno');
    var j2= new Player('facha');
    

    data={
        player1:j1,
        player2:j2,
        rounds:[],
        currentHand:j1,
        currentRound:undefined,
        score:[0,0]
      }

    //console.log(data);
    var game = new Game(data);
    //console.log(game);  
    
    

    
    callback =function(err,game){
      if (err){ 
        console.log(err);
        done(err);
      };
        console.log("IMPRIMO J1");
        console.log(j1);
        console.log("IMPRIMO GAME.PLAYER1");
        console.log(game.player1);


        Game.findOne({player1:j1},function(err,result){
          console.log(err);
          if(err){done(err);}

          //console.log(result);;
            a =new Player('lala');

          expect(result.player1.name).to.eq(a.name); 
          done();//   expect(game.player1.name).to.eq(data.player1.name); //ponemos el expect en un callback para que se ejecute si o si uando termina el save
            

          });
      };
    game.save(callback);
  






  });


 // it('Should have two players', function(){
 //   expect(game).to.have.property('player1');
  //  expect(game).to.have.property('player2');
  //});
});




/*
describe('Game#play2', function(){
  var game;

  beforeEach(function(){
    game = new Game();
    game.newRound();

    // Force to have the following cards and envidoPoints
    game.player1.setCards([
        new Card(1, 'copa'),
        new Card(7, 'oro'),
        new Card(2, 'oro')
    ]);

    game.player2.setCards([
        new Card(6, 'copa'),
        new Card(7, 'copa'),
        new Card(2, 'basto')
    ]);
  game.player1.envidopoints =game.player1.points();
  game.player2.envidopoints =game.player2.points();
  

  
})
});


*/







var expect = require("chai").expect;
var player_model = require("../models/player");
var game_model   = require("../models/game");
var game_card    = require("../models/card");

var Game = game_model.game;
var Card = game_card.card;

describe('Game', function(){
  var game = new Game();

  it('Should have two players', function(){
    expect(game).to.have.property('player1');
    expect(game).to.have.property('player2');
  });
});

describe('Game#play', function(){
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
  });

  it('plays [envido, quiero] should gives 2 points to winner', function(){
    game.play('Player 1', 'envido');
    game.play('Player 2', 'quiero');

    expect(game.currentRound.calculateRealPoints()).to.deep.equal([0, 2]);
  });

  it('plays 2 hands should gives 2 to p2 and 1 point to player 1 ', function(){
    game.play('Player 1', 'envido');
    game.play('Player 2', 'quiero');
    
    game.play('Player 1', 'play-card',game.player1.cards[1]);
    game.play('Player 2', 'play-card',game.player2.cards[1]);
    

    game.play('Player 1', 'play-card',game.player1.cards[2]);
    game.play('Player 2', 'play-card',game.player2.cards[2]);
    
   expect(game.currentRound.calculateRealPoints()).to.deep.equal([1, 2]);
  });

  it('plays 3 hands  and envido and truco should gives 2 to p2 and 2 point to player 1 ', function(){
    game.play('Player 1', 'envido');
    game.play('Player 2', 'quiero');
    
    game.play('Player 1', 'play-card',game.player1.cards[2]);
    game.play('Player 2', 'play-card',game.player2.cards[2]);

     game.play('Player 1', 'truco');
    game.play('Player 2', 'quiero');
    game.play('Player 1', 'play-card',game.player1.cards[1]);
    game.play('Player 2', 'play-card',game.player2.cards[1]);
    

    
    
   expect(game.currentRound.calculateRealPoints()).to.deep.equal([2, 2]);
  });
  it('plays 1 hands  and envido and truco should gives 2 to p2 and 1 point to player 1 ', function(){
    game.play('Player 1', 'envido');
    game.play('Player 2', 'quiero');
    
    game.play('Player 1', 'play-card',game.player1.cards[2]);
    game.play('Player 2', 'play-card',game.player2.cards[2]);

    game.play('Player 1', 'truco');
    game.play('Player 2', 'no-quiero');

    
    
   expect(game.currentRound.calculateRealPoints()).to.deep.equal([1, 2]);
  });

  it('plays 3 hands  and envido and truco should gives 3 to p2 and 1 point to player 1 ', function(){
    game.play('Player 1', 'envido');
    game.play('Player 2', 'quiero');
    
    game.play('Player 1', 'play-card',game.player1.cards[2]);
    game.play('Player 2', 'play-card',game.player2.cards[2]);
    game.play('Player 1', 'play-card',game.player1.cards[1]);
     game.play('Player 2', 'truco');
    game.play('Player 1', 'no-quiero');
    
    
    

    
    
   expect(game.currentRound.calculateRealPoints()).to.deep.equal([0, 3]);
  });

  it('plays 0 hands  and envido and truco should gives 0 to p2 and 2 point to player 1 ', function(){
    game.play('Player 1', 'envido');
    console.log(game.currentRound.currentTurn.getname());

    game.play('Player 2', 'no-quiero');
    console.log(game.currentRound.currentTurn.getname());
    game.play('Player 1', 'truco');
    console.log(game.currentRound.currentTurn.getname());
    game.play('Player 2', 'no-quiero');
    

    
    
   expect(game.currentRound.calculateRealPoints()).to.deep.equal([2, 0]);
  });



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







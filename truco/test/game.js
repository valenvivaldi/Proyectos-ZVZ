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

  it('plays [envido, quiero] should gives 2 points to winner', function(){
    game.play('Player 1', 'envido');
    game.play('Player 2', 'quiero');
    game.play('Player 1', 'play-card',game.player1.cards[2]);
    game.play('Player 2', 'play-card',game.player2.cards[2]);
    
    game.play('Player 1', 'play-card',game.player1.cards[1]);
    game.play('Player 2', 'play-card',game.player2.cards[1]);
    expect(game.currentRound.calculateRealPoints()).to.deep.equal([1, 2]);
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







/*
 *
 * Represents a game
 * @param player1 [String]: name of player 1
 * @param player2 [String]: name of player 2
 *
 */

var _ = require('lodash');
var playerModel = require("./player");
var roundModel = require("./round");


var Player = playerModel.player;
var Round  = roundModel.round;

function Game(player1, player2){
  /*
   * Player 1
   */
  this.player1 = new Player('Player 1');

  /*
   * Player 2
   */
  this.player2 = new Player('Player 2');

  /*
   * sequence of previous Rounds
   */
  this.rounds = [];

  /*
   * Game's hand
   */
  this.currentHand = this.player1;

  /*
   * Game's hand
   */
  this.currentRound = undefined;

  /*
   * Game' score
   */
  this.score = [0, 0];

}

/*
 * Check if it's valid move and play in the current round
 */
Game.prototype.play = function(player, action, value){
  if(this.currentRound.currentTurn.getname() !== player)
    throw new Error("[ERROR] INVALID TURN...");

  if(this.currentRound.fsm.cannot(action))
    throw new Error("[ERROR] INVALID MOVE...");
  if (action=='envido'){this.currentRound.jugadorCantoEnvido=convertStringToPlayer(player);};
  if (action=='truco'){this.currentRound.jugadorCantoTruco=convertStringToPlayer(player);};



  return this.currentRound.play(action, value);
};

/*
 * Create and return a new Round to this game
 */
Game.prototype.newRound = function(){
  var round = new Round(this, this.currentHand);
  this.currentRound = round;
  this.currentHand = switchPlayer(this.currentHand);
  this.rounds.push(round);

  return this;
}

/*
 * returns the oposite player
 */
function switchPlayer(player) {
  return this.player1 === player ? this.player2 : this.player1;
};

function convertStringToPlayer (nombre){
if (this.player1.getname()==nombre){return this.player1;}else{return this.player2;}

}



module.exports.game = Game;

var mongoose= require('mongoose');
//mongoose.connect('mongodb://localhost/truco');
//var db=mongoose.connection;

//db.on('error',console.error.bind(console,'connection error'));
//db.once('open',function(){
 // console.log('we are connected!!!');
//});

var _ = require('lodash');
var playerModel = require("./player");
var roundModel = require("./round");


var Player = playerModel.player;
var Round  = roundModel.round;







var ObjectId=  mongoose.Schema.Types.ObjectId;

var GameSchema= mongoose.Schema({ //vamos cargando los atributos en el schema
    //player1:ObjectId,
    //player2:ObjectId,
    //rounds:Array,
    //currenHand:ObjectId,
    //currentRound:ObjectId,
    //score:Array,
   // player1:{type: ObjectId,ref: 'Player'},
    //player2:{type: ObjectId, ref: 'Player'},
    name:String,
    player1:Object,
    player2:Object,
   
    rounds:Array,
    //currenHand:{type:ObjectId, ref: 'Player'},
   // currentRound:{type:ObjectId, ref: 'Round'},
    currentHand:Object,
    currentRound:Object,




    score:Array,



});

var Game = mongoose.model ('Game',GameSchema);





/*
 *
 * Represents a game
 * @param player1 [String]: name of player 1
 * @param player2 [String]: name of player 2
 *
 */


//function Game(){                   //   player1, player2){
  /*
   * Player 1
   */
 // this.player1 = new Player('Player 1');

  /*
   * Player 2
   */
 // this.player2 = new Player('Player 2');

  /*
   * sequence of previous Rounds
   */
 // this.rounds = [];

  /*
   * Game's hand
   
   */
 // this.currentHand = this.player1;

  /*
   * Game's hand
   */
  //this.currentRound = undefined;

  /*
   * Game' score
   */
 // this.score = [0, 0];

//}

/*
 * Check if it's valid move and play in the current round
 */
Game.prototype.play = function(player, action, value){
  if(this.currentRound.currentTurn.name !== player)
    throw new Error("[ERROR] INVALID TURN...");
console.log(this.currentRound.fsm.cannot);
  //if(this.currentRound.fsm.cannot(action))
    //throw new Error("[ERROR] INVALID MOVE...");
  if (action=='envido'){this.currentRound.jugadorCantoEnvido=this.currentRound.currentTurn;};        //convertStringToPlayer(player);};
  if (action=='truco'){this.currentRound.jugadorCantoTruco=this.currentRound.currentTurn;};                                     //convertStringToPlayer(player);};



  return this.currentRound.play(action, value);
};

/*
 * Create and return a new Round to this game
 */
Game.prototype.newRound = function(){
  var round = new Round(this, this.currentHand);
  this.rounds.push(round);
  this.currentHand = switchPlayer(this.currentHand);
  this.currentRound = round;

  return this;
}

/*
 * returns the oposite player
 */
Game.prototype.switchPlayer=function(player) {
  if (this.player1.name == player.name){ return this.player2;}else{return this.player1;} ;
};

function convertStringToPlayer (nombre){
if (this.player1.name===nombre){return this.player1;}else{return this.player2;}

}

//Game.prototype.returndb

module.exports.game = Game;

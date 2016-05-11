var cardModel = require('./models/card');
var deckModel = require('./models/deck');
var playerModel = require('./models/player');
var roundModel = require('./models/round');


var Card = cardModel.card;
var Deck = deckModel.deck;
var Player = playerModel.player;
var Round = roundModel.round;


var bruno = new Player(1);

var facha = new Player(2);

var ronda = new Round(1,bruno,facha);


ronda.playround();
console.log(bruno.points);






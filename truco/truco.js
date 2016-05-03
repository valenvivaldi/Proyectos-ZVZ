var cardModel = require('./models/card');
var deckModel = require('./models/deck');
var playerModel = require('./models/player');

var Card = cardModel.card;
var Deck = deckModel.deck;
var Player = playerModel.player;



var jugador1 = new Player(1);

var facha = new Player(2);
var decksito =  new Deck();
var mazo = decksito.mix();



jugador1.setcards(mazo[0],mazo[1],mazo[2]);
Console.log(jugador1.showcards());

console.log(jugador1.puntosenvido());


var cardModel = require('./models/card');
var deckModel = require('./models/deck');
var playerModel = require('./models/player');

var Card = cardModel.card;
var Deck = deckModel.deck;
var Player = playerModel.player;



var jugador1 = new Player(1);

var facha = new Player(2);
var mazo =  new Deck().mix();




jugador1.setcards(mazo[0],mazo[1],mazo[2]);
console.log(jugador1.showcards());

jugador1.puntosenvido();


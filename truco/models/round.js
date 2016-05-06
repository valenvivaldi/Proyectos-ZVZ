var cardModel = require('./models/card');
var deckModel = require('./models/deck');
var playerModel = require('./models/player');

var Card = cardModel.card;
var Deck = deckModel.deck;
var Player = playerModel.player;

function Round(identificador, player1, player2){
	this.id = identificador;
	this.p1 = player1;
	this.p2 = player2;
    this.puntosj1=0;
    this.puntosj2=0;
    
};

Round.prototype.playround= function(){
	var mazo = new Deck().mix();
	p1.setcards(mazo[0],mazo[1],mazo[2]);
	p2.setcards(mazo[3],mazo[4],mazo[5]);
	
	
	
	
	
	}



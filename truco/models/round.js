/*
 *
 * Represents a game's round
 *
 * @param gmae [Object]: game where the round belongs
 *
 */

var _ = require('lodash');
var StateMachine = require("../node_modules/javascript-state-machine/state-machine.js");
var deckModel = require("./deck");
var Deck  = deckModel.deck;

function newTrucoFSM(){
  var fsm = StateMachine.create({
  initial: 'init',
  events: [
    { name: 'play-card', from: 'init',                           to: 'primer-carta' },
    { name: 'envido',    from: ['init', 'primer-carta'],         to: 'envido' },
    { name: 'truco',     from: ['init', 'played-card'],          to: 'truco'  },
    { name: 'play-card', from: ['quiero', 'no-quiero',
                                'primer carta', 'played-card'],  to: 'played-card' },
    { name: 'quiero',    from: ['envido', 'truco'],              to: 'quiero'  },
    { name: 'no-quiero', from: ['envido', 'truco'],              to: 'no-quiero' },
    { name: 'fin-ronda', from: ['played-card','no-quiero'],      to:'estado-final' },  
  ],
   callbacks: {
    "onplayed-card":  function(event,from, to) { this.winnerOfRound = this.checkWinnerOfRound();
                                                if (this.winnerOfRound!==undefined){this.cargarPuntosJugador(this.winnerOfRound,this.puntosDelTruco());this.fsm["fin-ronda"];
                                            	}
                                                
   											//preguntar ERRROR !!!
  						}
  	

  	}

  	
	});
	return fsm;
}

function Round(game, turn){
  /*
   * Game
   */
  this.game = game;

  /*
   * next turn
   */
  this.currentTurn = turn;
  this.jugadorMano = turn;
  /*
   * here is a FSM to perform user's actions
   */
  this.fsm = newTrucoFSM();

  /*
   *
   */
  this.status = 'running';

  /*
   * Round' score
   */
  this.score = [0, 0];
//cartas jugadas por los jugadores
  this.cartasPrimerJugador=[];
  this.cartasSegundoJugador=[];


  this.jugadorCantoEnvido=undefined;
  this.jugadorCantoTruco=undefined;

	this.historialDeAcciones=[];
  this.winnerOfRound = undefined;



}


/*
 * Generate a new deck mixed and gives to players the correspondent cards
 */
Round.prototype.deal = function(){
  var deck = new Deck().mix();

  this.game.player1.setCards(_.pullAt(deck, 0, 2, 4));
  this.game.player2.setCards(_.pullAt(deck, 1, 3, 5));

	this.game.player1.envidopoints =this.game.player1.points();
  	this.game.player2.envidopoints =this.game.player2.points();
};

/*
 * Calculates who is the next player to play.
 *
 * + if action is 'quiero' or 'no-quiero' and it's playing 'envido' the next
 * player to play is who start to chant
 *
 * + if action is 'quiero' or 'no-quiero' and it's playing 'envido' the next
 * player to play is who start to chant
 *
 * ToDo
 */
 Round.prototype.changeTurn = function(){
   this.currentTurn = this.switchPlayer(this.currentTurn);
}

/*
 * returns the oposite player
 */
Round.prototype.switchPlayer= function(player) {
  return this.game.player1 === player ? this.game.player2 : this.game.player1;
};

/*
 * ToDo: Calculate the real score
 */
Round.prototype.calculateRealPoints =function(){
var puntosp1 = this.game.score[0] +this.score[0];
var puntosp2 = this.game.score[1] +this.score[1];

return [puntosp1,puntosp2];
}




Round.prototype.calculateScore = function(action){
  var accionAnterior = this.historialDeAcciones.length-2
  
  if(action == "quiero" &&this.historialDeAcciones[accionAnterior] =="envido" ){
    if (this.game.player1.envidopoints <this.game.player2.envidopoints){this.score[1]+=2;};
    if (this.game.player1.envidopoints >this.game.player2.envidopoints){this.score[0]+=2;};
    if (this.game.player1.envidopoints ==this.game.player2.envidopoints){this.cargarPuntosJugador(this.jugadorMano,2);};

  
  };
  if(action == "no-quiero" &&this.historialDeAcciones[accionAnterior] =="envido" ){

    if (this.jugadorCantoEnvido == this.game.player1) {this.score[0]+=1;};
  	if (this.jugadorCantoEnvido == this.game.player2) {this.score[1]+=1;};
  
  };


//esto tendir que ser un callback en el no-quiero
  if(action == "no-quiero" && this.historialDeAcciones[accionAnterior]=="truco"){
    if (this.jugadorCantoTruco == this.game.player1) {this.score[0]+=1;};
    if (this.jugadorCantoTruco == this.game.player2) {this.score[1]+=1;};
    this.winnerOfRound=this.jugadorCantoTruco;
    this.fsm["fin-ronda"]();
    
  };
  var aux = this.calculateRealPoints();  //verificamos que alguno haya llegado a los treinta por haber ganado el envido
  if (aux[0]>=30 || aux[1]>=30){this.fsm["fin-ronda"]};



  return this.score;
}

/*
 * Let's Play :)
 */
Round.prototype.play = function(action, value) {
  
  if(action=="play-card"){this.seJuegaCarta(value);}


  // move to the next state
  
  this.fsm[action]();
  this.historialDeAcciones.push(action);
  	
  // check if is needed sum score
  this.calculateScore(action);

  // Change player's turn
  return this.changeTurn();
// Muestra puntos actuales del juego 

};

Round.prototype.cargarPuntosJugador = function(player,puntos){
if (player ==this.game.player1){this.score[0]+=puntos;}
if (player ==this.game.player2){this.score[1]+=puntos;}

}

Round.prototype.showRealPoints = function (){
console.log ('El jugador:'+this.game.player1.getname()+' tiene '+this.score[0]+' actualmente \n');
console.log ('El jugador:'+this.game.player2.getname()+' tiene '+this.score[1]+' actualmente \n');
} 

Round.prototype.seJuegaCarta=function(carta){

for (var i=0; i < 3; i++) { 
if(this.game.player1.cards[i]==carta){
  this.game.player1.cards[i]=undefined;
  this.cartasPrimerJugador.push(carta);
  };

if(this.game.player2.cards[i]==carta){
  this.game.player2.cards[i]=undefined;
  this.cartasSegundoJugador.push(carta);
  };

}

};

Round.prototype.checkWinnerOfRound =function(){
var ganadorPrimera;
var ganadorSegunda;
var ganadorTercera;
	

	if (this.cartasPrimerJugador.length>=1&&this.cartasSegundoJugador.length>=1){	
  if(this.cartasPrimerJugador[0].weight <this.cartasSegundoJugador[0].weight){ganadorPrimera=this.game.player2;};
  if(this.cartasPrimerJugador[0].weight >this.cartasSegundoJugador[0].weight){ganadorPrimera=this.game.player1;};
  if(this.cartasPrimerJugador[0].weight ==this.cartasSegundoJugador[0].weight){ganadorPrimera="Pardas";};
	}

  if (this.cartasPrimerJugador.length>=2&&this.cartasSegundoJugador.length>=2){
  if(this.cartasPrimerJugador[1].weight <this.cartasSegundoJugador[1].weight){ganadorSegunda=this.game.player2;};
  if(this.cartasPrimerJugador[1].weight >this.cartasSegundoJugador[1].weight){ganadorSegunda=this.game.player1;};
  if(this.cartasPrimerJugador[1].weight ==this.cartasSegundoJugador[1].weight){ganadorSegunda="Pardas";};
  };
  

  if (this.cartasPrimerJugador.length==3&&this.cartasSegundoJugador.length==3){
  if(this.cartasPrimerJugador[2].weight <this.cartasSegundoJugador[2].weight){ganadorTercera=this.game.player2;};
  if(this.cartasPrimerJugador[2].weight >this.cartasSegundoJugador[2].weight){ganadorTercera=this.game.player1;};
  if(this.cartasPrimerJugador[2].weight ==this.cartasSegundoJugador[2].weight){ganadorTercera="Pardas";};
  };




  if (this.cartasPrimerJugador.length==2&&this.cartasSegundoJugador.length==2){
    if ((ganadorPrimera===ganadorSegunda)&&(ganadorPrimera!=="Pardas")){return ganadorPrimera;};
    if ((ganadorPrimera==="Pardas" )&&(ganadorSegunda!=="Pardas")){return ganadorSegunda;};
    if ((ganadorPrimera!=="Pardas")&&(ganadorSegunda==="Pardas")){return ganadorPrimera;};
  }
  if (this.cartasPrimerJugador.length==3&&this.cartasSegundoJugador.length==3){
    if ((ganadorPrimera===ganadorSegunda)&&(ganadorTercera!=="Pardas")){return ganadorTercera;};
    if ((ganadorPrimera===ganadorSegunda)&&(ganadorTercera==="Pardas")){return this.jugadorMano;};
     if ((ganadorPrimera!=="Pardas")&&(ganadorSegunda!=="Pardas")){
        if (ganadorTercera==="Pardas"){return ganadorPrimera;};
        return ganadorTercera;

     } 
  }
  if ((this.cartasPrimerJugador.length==1&&this.cartasSegundoJugador.length==1)&& (ganadorPrimera!=="Pardas")){
  	this.currentTurn = this.switchPlayer(ganadorPrimera);
  };
if ((this.cartasPrimerJugador.length==2&&this.cartasSegundoJugador.length==2)&& (ganadorSegunda!=="Pardas")){
  	this.currentTurn = this.switchPlayer(ganadorSegunda);
  };


return undefined;
};

Round.prototype.puntosDelTruco=function(){
if(this.jugadorCantoTruco !== undefined){return 1;
}
return 2;


};


module.exports.round = Round;

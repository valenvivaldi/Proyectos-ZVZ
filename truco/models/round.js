var mongoose= require('mongoose');


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




var RoundSchema= mongoose.Schema({
  currentTurn:Object,
  jugadorMano:Object,
  player1:Object,
  player2:Object, 
  fsm:Object,
  status:String,
  score:Array,
  cartasPrimerJugador:Array,
  cartasSegundoJugador:Array,
  jugadorCantoEnvido:Object,
  jugadorCantoTruco:Object,
  historialDeAcciones:Array,
  winnerOfRound : Object,

  ganadorPrimera:Object,
  ganadorSegunda:Object,
  ganadorTercera:Object

});

var Round = mongoose.model ('Round',RoundSchema);

//function Round(game,turn){
  /*
   * Game
   */
  //this.game = game;

  /*
   * next turn
   */
  //this.currentTurn = turn;
  //this.jugadorMano = turn;
  

  //this.player1=game.player1;
  //this.player2=game.player2;
  /*
   * here is a FSM to perform user's actions
   */
  //this.fsm = newTrucoFSM();

  /*
   *
   */
  //this.status = 'running';

  /*
   * Round' score
   */
  //this.score = game.score;



//cartas jugadas por los jugadores
 // this.cartasPrimerJugador=[];
  //this.cartasSegundoJugador=[];


  //this.jugadorCantoEnvido=undefined;
  //this.jugadorCantoTruco=undefined;

	//this.historialDeAcciones=[];
  //this.winnerOfRound = undefined;

  //this.ganadorPrimera;
  //this.ganadorSegunda;
  //this.ganadorTercera;




//}


/*
 * Generate a new deck mixed and gives to players the correspondent cards
 */
Round.prototype.deal = function(){
  var deck = new Deck().mix();

  this.player1.setCards(_.pullAt(deck, 0, 2, 4));
  this.player2.setCards(_.pullAt(deck, 1, 3, 5));

	this.player1.envidopoints =this.player1.points();
  	this.player2.envidopoints =this.player2.points();
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
  return this.player1 === player ? this.player2 : this.player1;
};

/*
 * ToDo: Calculate the real score
 */
Round.prototype.calculateRealPoints =function(){
var puntosp1 = this.score[0] //+this.score[0];
var puntosp2 = this.score[1] //+this.score[1];

return [puntosp1,puntosp2];
}




Round.prototype.calculateScore = function(action){
  var accionAnterior = this.historialDeAcciones.length-2
  
  if(action == "quiero" &&this.historialDeAcciones[accionAnterior] =="envido" ){
    if (this.player1.envidopoints <this.player2.envidopoints){this.score[1]+=2;};
    if (this.player1.envidopoints >this.player2.envidopoints){this.score[0]+=2;};
    if (this.player1.envidopoints ==this.player2.envidopoints){this.cargarPuntosJugador(this.jugadorMano,2);};

  
  };
  if(action == "no-quiero" &&this.historialDeAcciones[accionAnterior] =="envido" ){

    if (this.jugadorCantoEnvido == this.player1) {this.score[0]+=1;};
  	if (this.jugadorCantoEnvido == this.player2) {this.score[1]+=1;};
	this.currentTurn = this.switchPlayer(this.jugadorCantoEnvido);  
  };


//esto tendir que ser un callback en el no-quiero
  if(action == "no-quiero" && this.historialDeAcciones[accionAnterior]=="truco"){
    if (this.jugadorCantoTruco == this.player1) {this.score[0]+=1;};
    if (this.jugadorCantoTruco == this.player2) {this.score[1]+=1;};
    this.winnerOfRound=this.jugadorCantoTruco;
    this.fsm["fin-ronda"](this);
    
  };
  var aux = this.calculateRealPoints();  //verificamos que alguno haya llegado a los treinta por haber ganado el envido
  if (aux[0]>=30 || aux[1]>=30){this.fsm["fin-ronda"](this)};



  return this.score;
}

/*
 * Let's Play :)
 */
Round.prototype.play = function(action, value) {
  


  // move to the next state
  
  this.fsm[action](this);
  
  this.historialDeAcciones.push(action);
  	
  // check if is needed sum score
  this.calculateScore(action);

	if(action=="play-card"){
		this.seJuegaCarta(value);
		this.verificarGanador();
	}


  // Change player's turn
  return this.changeTurn();
// Muestra puntos actuales del juego 

};

Round.prototype.cargarPuntosJugador = function(player,puntos){
if (player ==this.player1){this.score[0]+=puntos;}
if (player ==this.player2){this.score[1]+=puntos;}

}

Round.prototype.showRealPoints = function (){
console.log ('El jugador:'+this.player1.getname()+' tiene '+this.score[0]+' actualmente \n');
console.log ('El jugador:'+this.player2.getname()+' tiene '+this.score[1]+' actualmente \n');
} 

Round.prototype.seJuegaCarta=function(carta){

for (var i=0; i < 3; i++) { 
if(this.player1.cards[i]==carta){
  this.player1.cards[i]=undefined;
  this.cartasPrimerJugador.push(carta);
  };

if(this.player2.cards[i]==carta){
  this.player2.cards[i]=undefined;
  this.cartasSegundoJugador.push(carta);
  };

}

};

Round.prototype.checkWinnerOfRound =function(){





	if (this.cartasPrimerJugador.length>=1&&this.cartasSegundoJugador.length>=1){	
  if(this.cartasPrimerJugador[0].weight <this.cartasSegundoJugador[0].weight){this.ganadorPrimera=this.game.player2;};
  if(this.cartasPrimerJugador[0].weight >this.cartasSegundoJugador[0].weight){this.ganadorPrimera=this.game.player1;};
  if(this.cartasPrimerJugador[0].weight == this.cartasSegundoJugador[0].weight){this.ganadorPrimera="Pardas";};
	}


  if (this.cartasPrimerJugador.length>=2&&this.cartasSegundoJugador.length>=2){
  if(this.cartasPrimerJugador[1].weight <this.cartasSegundoJugador[1].weight){this.ganadorSegunda=this.game.player2;};
  if(this.cartasPrimerJugador[1].weight >this.cartasSegundoJugador[1].weight){this.ganadorSegunda=this.game.player1;};
  if(this.cartasPrimerJugador[1].weight ==this.cartasSegundoJugador[1].weight){this.ganadorSegunda="Pardas";};
    

  };
  

  if (this.cartasPrimerJugador.length==3&&this.cartasSegundoJugador.length==3){
  if(this.cartasPrimerJugador[2].weight <this.cartasSegundoJugador[2].weight){this.ganadorTercera=this.game.player2;};
  if(this.cartasPrimerJugador[2].weight >this.cartasSegundoJugador[2].weight){this.ganadorTercera=this.game.player1;};
  if(this.cartasPrimerJugador[2].weight ==this.cartasSegundoJugador[2].weight){this.ganadorTercera="Pardas";};
  };


  if ((this.cartasPrimerJugador.length==1&&this.cartasSegundoJugador.length==1)&& (this.ganadorPrimera!=="Pardas")){
  	this.currentTurn = this.switchPlayer(this.ganadorPrimera);
  };
  if ((this.cartasPrimerJugador.length==2&&this.cartasSegundoJugador.length==2)&& (this.ganadorSegunda!=="Pardas")){
  	this.currentTurn = this.switchPlayer(this.ganadorSegunda);
   };





  if ((this.cartasPrimerJugador.length==2)&&(this.cartasSegundoJugador.length==2)){
    if ((this.ganadorPrimera===this.ganadorSegunda)&&(this.ganadorPrimera!=="Pardas")){return this.ganadorPrimera;};
    if ((this.ganadorPrimera==="Pardas" )&&(this.ganadorSegunda!=="Pardas")){return this.ganadorSegunda;};
    if ((this.ganadorPrimera!="Pardas")&&(this.ganadorSegunda=="Pardas")){return this.ganadorPrimera;};
  };



  if (this.cartasPrimerJugador.length==3&&this.cartasSegundoJugador.length==3){


    if ((this.ganadorPrimera===this.ganadorSegunda)&&(this.ganadorTercera!=="Pardas")){return this.ganadorTercera;};
    if ((this.ganadorPrimera===this.ganadorSegunda)&&(this.ganadorTercera==="Pardas")){return this.jugadorMano;};
     if ((this.ganadorPrimera!=="Pardas")&&(this.ganadorSegunda!=="Pardas")){
        if (this.ganadorTercera==="Pardas"){return this.ganadorPrimera;};
        return this.ganadorTercera;

     }; 
  }

  

return undefined;

};

Round.prototype.puntosDelTruco=function(){
if(this.jugadorCantoTruco == undefined){return 1;
}
return 2;
};

Round.prototype.verificarGanador = function(){
	this.winnerOfRound = this.checkWinnerOfRound();
 	if (this.winnerOfRound!=undefined){
 		this.cargarPuntosJugador(this.winnerOfRound,this.puntosDelTruco());
        this.fsm["fin-ronda"];

}
};


Round.prototype.newTrucoFSM = function(){
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
  ] 
  });
  return fsm;
}



module.exports.round = Round;

var cardModel = require('./card');
var deckModel = require('./deck');
var playerModel = require('./player');

var Card = cardModel.card;
var Deck = deckModel.deck;
var Player = playerModel.player;

function Round(identificador, player1, player2){
	this.id = identificador;
	this.p1 = player1;
	this.p2 = player2;
    this.puntosj1=0;
    this.puntosj2=0;
    
    this.envido=null;
    this.envidoenvido=null;
    this.realenvido=null;
    this.faltaenvido=null;
	this.quiero=null;
	this.jugNoQuerido=null; //en el caso que alguno diga no quiero en algna instacia del envido, en esta variable se guarda el jugador que ganaria el 
							// envido porque el otro jugador no quiso
	
	this.seFueMazo=null; //aca se guarda el jugador que se va al mazo 
};

Round.prototype.playround= function(){
	var mazo = new Deck().mix();
	this.p1.setcards(mazo[0],mazo[1],mazo[2]);
	this.p2.setcards(mazo[3],mazo[4],mazo[5]);
	
	while(this.quiero==null){
			this.p1.jugarEnvido(this.envido,this.envidoenvido,this.realenvido,this.faltaenvido,this.quiero,this.jugNoQuerido,this.p2,this.seFueMazo);
			this.p2.jugarEnvido(this.envido,this.envidoenvido,this.realenvido,this.faltaenvido,this.quiero,this.jugNoQuerido,this.p1,this.seFueMazo);
		
		if(this.todosnull()){break;}
		if(this.quiero==true){
				var ganador =ganadorenvido(this.p1,this.p2);
				var perdedor =perdedorenvido(this.p1,this.p2);
				
			if(faltaenvido!=null){
				ganador.points+=calculoFaltaEnvido(ganador,perdedor); 
				}else{
					var auxiliar =0;	
					if(this.realenvido!=null){auxiliar+=3;}
					if(this.envidoenvido!=null){auxiliar+=2;}
					if(this.envido!=null){auxiliar+=2;}
					ganador.points+=auxiliar;
					
					}
			
			}
			
			
			
		if(this.quiero==false){}
			this.jugNoQuerido.points+=this.calculoNoQuerido(this.envido,this.envidoenvido,this.realenvido,this.faltaenvido);
		
		
		}
		
	
	
	
	return null;
	};

Round.prototype.todosnull=function(){
	if(this.envido==null&&this.envidoenvido==null&&this.realenvido==null&&this.faltaenvido==null&&this.quiero==null){return  true;}
	return false;
	}
Round.prototype.ganadorenvido=function(jug1,jug2){
	if (jug1.puntosenvido()>=jug2.puntosenvido()){return jug1;}
	return jug2;
	
	}
	
	//ESTO SE PUEDE OPTIMIZAR HACIENDO UNA SOLA FUNCION GANDOR QUE DEVUELVA EL GANADOR Y EL PERDEDOR EN DOS VARIABLES AUXLIARES PASADAS COMO PARAMETRO
	
Round.prototype.perdedorenvido=function(jug1,jug2){
	if (jug1.puntosenvido()<jug2.puntosenvido()){return jug1;}
	return jug2;
	
	}	
	
Round.prototype.calculoFaltaEnvido=function(j1,j2){
	if(j1.points<=15&&j2.points<=15){return 30;}
	if(j2.points<=15){return (15-j2.points)}
	return (30-j2.points);
	}
Round.prototype.calculoNoQuerido=function(env,envenv,real,falta){
	var auxiliar =0;	
	if(falta!=null){
					auxiliar++;
					if(real!=null){auxiliar+=3;}
					if(envenv!=null){auxiliar+=2;}
					if(env!=null){auxiliar+=2;}
					return auxiliar;
					}
					
	if(real!=null){	
					auxiliar++;
					if(envenv!=null){auxiliar+=2;}
					if(env!=null){auxiliar+=2;}
					return auxiliar;
		}
	if(envenv!=null){
					
					auxiliar++;
					if(env!=null){auxiliar+=2;}
					return auxiliar;
		}
	if(env!=null){return 1;}
	}	
	
module.exports.round = Round;


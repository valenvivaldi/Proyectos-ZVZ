

//CREADORA DE JUGADOR
function Player(identificador){
  this.id = identificador;
  this.points=0;
 this.firstcard=null;
 this.secondcard=null;
 this.thirthcard = null;
 
};
//CAMBIAR LOS THIRTH POR THIRD!!!! bOLUDOOOOO
Player.prototype.showcards = function(){
  var resultado="";
  if(this.firstcard!=null){resultado=resultado+"La primer carta es un "+this.firstcard.show()+" . \n"};
  if(this.secondcard!=null){resultado=resultado+"La segunda carta es un "+this.secondcard.show()+" . \n "};
if(this.thirthcard!=null){resultado=resultado+"La tercera carta es un "+this.thirthcard.show()+" . "};
return resultado;
};

//HACER EL RETURN CARDS !!!; BOLUDOOOOO X2
Player.prototype.setcards= function(primera, segunda, tercera){
		this.firstcard=primera;
		this.secondcard=segunda;
		this.thirthcard = tercera;
};


Player.prototype.puntosenvido=function(){
	var par1=valorpar(this.firstcard,this.secondcard);
	var par2=valorpar(this.thirthcard,this.secondcard);
	var par3=valorpar(this.firstcard,this.thirthcard);
	resultado = "El jugador "+(this.id)+" tiene "+Math.max(par1,par2,par3)+" puntos para el envidooooo";
	return resultado;
	}
valorpar=function(a,b){
	if(a.suit ==a.suit){
		return a.envidovalor()+b.envidovalor();
		}
	return 0;
	}

module.exports.player = Player;



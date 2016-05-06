

//CREADORA DE JUGADOR
function Player(identificador){
  this.id = identificador;
  this.points=0;
 this.firstcard=null;
 this.secondcard=null;
 this.thirdcard = null;
 
};

Player.prototype.showcards = function(){
  var resultado="";
  if(this.firstcard!=null){resultado=resultado+"La primer carta es un "+this.firstcard.show()+" . \n"};
  if(this.secondcard!=null){resultado=resultado+"La segunda carta es un "+this.secondcard.show()+" . \n "};
if(this.thirdcard!=null){resultado=resultado+"La tercera carta es un "+this.thirdcard.show()+" . "};
return resultado;
};


Player.prototype.returncard = function (num){
	if (num ==1){return this.firstcard}
	if (num ==2){return this.secondcard}
	if (num ==3){return this.thirdcard}
	return null;
	
	};

Player.prototype.setcards= function(primera, segunda, tercera){
		this.firstcard=primera;
		this.secondcard=segunda;
		this.thirdcard = tercera;
};


Player.prototype.puntosenvido=function(){
	var par1=valorpar(this.firstcard,this.secondcard);
	var par2=valorpar(this.thirdcard,this.secondcard);
	var par3=valorpar(this.firstcard,this.thirdcard);
	resultado = Math.max(par1,par2,par3);
	console.log("El jugador "+(this.id)+" tiene "+Math.max(par1,par2,par3)+" puntos para el envidooooo");
	return resultado;
	}
valorpar=function(a,b){
	if(a.suit ==b.suit){
		return a.envidovalor()+b.envidovalor();
		}
	if(a.number<10&&b.number>10){return a.number}	
	if(a.number>10&&b.number<10){return b.number}	
	if(a.number<10&&b.number<10){return Math.max(a.number,b.number)}
	return 0;
	};

module.exports.player = Player;



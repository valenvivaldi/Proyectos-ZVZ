var expect = require("chai").expect;
var playerModel = require("../models/player.js");

var Player = playerModel.player;
var Card = require("../models/card.js").card;
describe('Player', function() {
  var p = new Player ({

    name: "pepe",
  })
describe('Player',function(done){
  it('#save',function(){
    data={
      name:"Juan",
      cards:[new Card(1,"espada")],
      envidoPoints:28


    }
  var p= new Player (data); 
  var callback =function(err,player){
    if (err){ done(err);};
    expect (player.name).to.be.eq(data.name); //ponemos el expect en un callback para que se ejecute si o si uando termina el save
    done();

  };
  p.save(callback);


  })
Player. findOne({name:"Juan"})


})
  
});


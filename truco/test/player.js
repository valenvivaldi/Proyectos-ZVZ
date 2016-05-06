var expect = require("chai").expect;
var playerModel = require("../models/player.js");

var Player = playerModel.player;

var cardModel = require("../models/card.js");

var Card = cardModel.card;



describe('Player', function() {

  describe("properties", function(){
    it('should have a points property', function(){
      var c = new Player(1);
      expect(c).to.have.property('points');
    });

    it('should have a id property', function(){
      var c = new Player(1);
      expect(c).to.have.property('id');
    });
  });


  

  describe("puntos envido guachin faso", function(){
    var z = new Card(1, 'espada');
    var x = new Card(4, 'basto');
    var y = new Card(5, 'basto');
    var c = new Player(1);
    c.setcards(z,x,y);
    describe("when this is better than argument", function(){
      it("should returns 29 points for envido", function(){
        expect(c.puntosenvido()).to.be.eq(29);
      });
    });

    
	});
  describe("puntos envido guachin faso", function(){
    var z = new Card(11, 'oro');
    var x = new Card(11, 'basto');
    var y = new Card(12, 'espada');
    var c = new Player(1);
    c.setcards(z,x,y);
    describe("when this is better than argument", function(){
      it("should returns 29 points for envido", function(){
        expect(c.puntosenvido()).to.be.eq(0);
      });
    });

    
	});
  
  
  
  
    
  });

function playingCard (valueString, suite){

  this.valueString = valueString;
  this.suite = suite;
  if (this.suite === "club" || this.suite === "clover"){ this.color = "black";} else { (this.color = "red"); }
  this.value;
  this.suiteImg;

  this.calcValue(this.valueString);
  this.calcSuiteRep(this.suite);

} //end of playingCard object

playingCard.prototype = {
  calcValue: function (str) {
    switch (str) {
      case "A":
        this.value = [1, 11];
        break;
      case "2":
        this.value = 2;
        break;
      case "3":
        this.value = 3;
        break;
      case "4":
        this.value = 4;
        break;
      case "5":
        this.value = 5;
        break;
      case "6":
        this.value = 6;
        break;
      case "7":
        this.value = 7;
        break;
      case "8":
        this.value = 8;
        break;
      case "9":
        this.value = 9;
        break;
      case "10":
        this.value = 10;
        break;
      case "J":
        this.value = 10;
        break;
      case "Q":
        this.value = 10;
        break;
      case "K":
        this.value = 10;
        break;
    }
  },//end of calcValue function

  calcSuiteRep: function (str){
    if(str === "club"){
      this.suiteImg = "animals_octop.gif";
    }
    if(str === "clover"){
      this.suiteImg = "animals_octop.gif";
    }
    if(str === "heart"){
      this.suiteImg = "animals_octop.gif";
    }
    if(str === "diamond"){
      this.suiteImg = "animals_octop.gif";
    }
  } //end of calcSuitRep function
} //end of PlayingCard object functions

function Deck (){

  this.cards = [];
  this.suites = ["club", "clover", "diamond", "heart"];
  this.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

} //end of Deck object

Deck.prototype = {
  initDeck: function () {
    for (var i = 0; i < this.suites.length; i++){
      for(var j = 0; j<this.values.length; j++){
        this.cards.push(new playingCard(this.values[j], this.suites[i]));
      }//values loop
    }//suites loop
  }, //end of initDeck function

  shuffleDeck: function (n) {
    if (!n) {
      n = 5;
    }

    var l = this.cards.length,
        r,tmp,i,j;

    for (i = 0; i < n; i++) {
      for (j = 0; j < l; j++) {
        r = Math.floor(Math.random() * l);
        tmp = this.cards[j];
        this.cards[j] = this.cards[r];
        this.cards[r] = tmp;
      }
    }
  },//end of shuffle function; borrowed from shuffle function in https://github.com/atomantic/JavaScript-Playing-Cards/blob/master/playingCards.js

  hit: function (){
    var l = this.cards.length;
    var r, returnCard;

    r = Math.floor(Math.random() * l);
    returnCard = this.cards[r];
    this.cards.splice(r, 1);
    return returnCard;
  }, //end of draw function

  stand: function (dealer, player){
    var dealerTotal = dealer.hand[0].value + dealer.hand[1].value + dealer.hand[2].value;
    var playerTotal = 0;
    var winner;

    for(var i = 0; i < player.hand.length; i++){
      playerTotal += player.hand[i].value;
    }

    console.log(dealerTotal);
    console.log(playerTotal);

    if ( (playerTotal > dealerTotal) && playerTotal <= 21){
      winner = player;
    }


    if (playerTotal === dealerTotal){ winner = "tie" };

    if (typeof dealerTotal === "string" || typeof playerTotal === "string"){
      winner = this.handleAces(dealer, player);
    }
  //  console.log(winner);
    return winner;
  }, //end of stand function

  handleAces: function (dealer, player){
    console.log("handling aces");
  }

}//end of Deck object functions

function Player (name, hand, icon) {
  this.name = name;
  this.hand = hand;
  this.icon = icon;
}

//"main function"
$(document).ready(function (){
  var deck = new Deck();
  deck.initDeck();
  deck.shuffleDeck();

  var playerHand = [];
  var dealerHand = [];

  for( var i = 0; i < 3; i++){
    dealerHand.push(deck.hit());
  }

  for(var i = 0; i < 2; i++){
    playerHand.push(deck.hit());
  }

  player = new Player("Amy", playerHand, "test");
  dealer = new Player("Voldemort", dealerHand, "test");

  console.log(deck.stand(dealer, player));

//event handler for hit
//event handler for stand

})

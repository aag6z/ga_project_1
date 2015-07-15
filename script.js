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
      this.suiteImg = "slyth.jpg";
    }
    if(str === "clover"){
      this.suiteImg = "raven.jpg";
    }
    if(str === "heart"){
      this.suiteImg = "gryf.jpg";
    }
    if(str === "diamond"){
      this.suiteImg = "huff.jpg";
    }
  } //end of calcSuitRep function
} //end of PlayingCard object functions

function Deck (){

  this.cards = [];
  this.suites = ["club", "clover", "diamond", "heart"];
  //"A",
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

  dealerHit: function(){
    dealer.hand.push(this.hit());
    for(var i = 0; i < dealer.hand.length; i++){
      dealer.totalScore += dealer.hand[i].value;
    }

    if(dealer.totalScore != "number"){
      this.handleAces(true, false);
    }

    return dealer.totalScore;



  },

  playerHit: function(){
    for(var i = 0; i < player.hand.length; i++){
      player.totalScore += player.hand[i].value;
    }

    if(player.totalScore != "number"){
      this.handleAces(true, false);
    }

    return player.totalScore;

  },

  stand: function (){

    var dealerTotal = dealer.hand[0].value + dealer.hand[1].value;
    if(typeof dealer.hand[0].value != "number" && typeof dealer.hand[1].value == "number" ){
      dealerTotal = dealer.hand[1].value + 11;
    }
    if(typeof dealer.hand[1].value != "number" && typeof dealer.hand[0].value == "number" ){
      dealerTotal = dealer.hand[0].value + 11;
    }
    if (typeof dealer.hand[0].value != "number" && typeof dealer.hand[1].value != "number"){
      dealerTotal = 20;
    }



    while(dealerTotal < 17){ //&& this.playerHit() < 21){
      console.log(" in less than 17");
      console.log(dealerTotal + " dealerTotal");
      dealerTotal = this.dealerHit();
    }



    var dealerTotal = 0;
    var playerTotal = 0;
    var winner;
    var dealerHasAces = false;
    var playerHasAces = false;

    for(var i = 0; i < player.hand.length; i++){
      playerTotal += player.hand[i].value;
    }

    for(var i = 0; i < dealer.hand.length; i++){
      dealerTotal += dealer.hand[i].value;
    }

//    console.log(dealer);
//    console.log ("dealer");
//    console.log(player);
//    console.log("player");

//    console.log("playerTot " + playerTotal);
//    console.log("dealerTot " + dealerTotal);

    if (dealerTotal === 21){ winner = dealer.name;}
    if (playerTotal === 21){ winner = player.name;}
    if (dealerTotal < 21 && playerTotal < 21){
      var dealerDif = 21 - dealerTotal;
      var playerDif = 21 - playerTotal;
      if (playerDif < dealerDif){ winner = player.name} else { winner = dealer.name; }
    }

    if (playerTotal === dealerTotal){ winner = "tie" };
    if (playerTotal > 21 && dealerTotal > 21){ winner = "nobody"}
    if (dealerTotal > 21 && playerTotal < 21){ winner = player.name;}
    if (playerTotal > 21 && dealerTotal < 21){winner = dealer.name;}

  //  console.log(typeof dealerTotal);
  //  console.log(typeof playerTotal);
    player.totalScore = playerTotal;
    dealer.totalScore = dealerTotal;

    //handleAces
    if(typeof dealerTotal === "string" || typeof playerTotal === "string"){
      if (typeof dealerTotal === "string"){ dealerHasAces = true; }
      if (typeof playerTotal === "string"){ playerHasAces = true; }
      console.log ("calling Aces function");
      winner = this.handleAces(dealerHasAces, playerHasAces);
    }//end handleAces

    //console.log(winner);
    //console.log(" winnder from inside stand function");
    console.log(playerTotal);
    console.log(dealerTotal);

    return winner;
  }, //end of stand function

  handleAces: function (dealerHasAces, playerHasAces){
    var dealerAces = 0;
    var playerAces = 0;
    var playerTotal = 0;
    var dealerTotal = 0;
    var winner = "";

    for (var i = 0; i < dealer.hand.length; i++){
      if(typeof dealer.hand[i].value != "number"){
        dealerAces++;
      }
      else {
        dealerTotal += dealer.hand[i].value;
      }
    }

    for (var i = 0; i < player.hand.length; i++){
      if(typeof player.hand[i].value != "number"){
        playerAces++;
      }
      else {
        playerTotal += player.hand[i].value;
      }
    }


    if(dealerHasAces){
      if(dealerAces == 1){
        var dealerTotal_temp1 = dealerTotal + 1;
        var dealerTotal_temp2 = dealerTotal + 11;
      }
      if(dealerAces == 2){
        var dealerTotal_temp1 = dealerTotal + 2;
        var dealerTotal_temp2 = dealerTotal + 12;
      }
      if(dealerAces == 3){
        var dealerTotal_temp1 = 3;
        var dealerTotal_temp2 = 13;
      }
      if(dealerAces == 4){
        var dealerTotal_temp1 = 4;
        var dealerTotal_temp2 = 14;
      }
      if ((dealerTotal_temp1 > dealerTotal_temp2 && dealerTotal_temp1 <= 21) || (dealerTotal_temp1 <= 21 && dealerTotal_temp2 > 21)){
        dealerTotal = dealerTotal_temp1;
      }
      if ((dealerTotal_temp2 >= dealerTotal_temp1 && dealerTotal_temp2 <=21) || (dealerTotal_temp2 <= 21 && dealerTotal_temp1 > 21)){
        dealerTotal = dealerTotal_temp2;
      }
      if(dealerTotal_temp1 > 21 && dealerTotal_temp2 > 21){
        dealerTotal = Math.min(dealerTotal_temp1, dealerTotal_temp2);
      }

    }

    if(playerHasAces){
      if(playerAces == 1){
        var playerTotal_temp1 = playerTotal + 1;
        var playerTotal_temp2 = playerTotal + 11;
      }
      if(playerAces == 2){
        var playerTotal_temp1 = playerTotal + 2;
        var playerTotal_temp2 = playerTotal + 12;
      }
      if(playerAces == 3){
        var playerTotal_temp1 = 3;
        var playerTotal_temp2 = 13;
      }

      if(playerAces == 4){
        var playerTotal_temp1 = 4;
        var playerTotal_temp2 = 14;
      }

      if ((playerTotal_temp1 > playerTotal_temp2 && playerTotal_temp1 <= 21) || (playerTotal_temp1 <= 21 && playerTotal_temp2 > 21)){
        playerTotal = playerTotal_temp1
      }
      if ((playerTotal_temp2 >= playerTotal_temp1 && playerTotal_temp2 <=21) || (playerTotal_temp2 <= 21 && playerTotal_temp1 > 21)){
        playerTotal = playerTotal_temp2;
      }
      if(playerTotal_temp1 > 21 && playerTotal_temp2 > 21){
        playerTotal = Math.min(playerTotal_temp1, playerTotal_temp2);
      }

    }

    player.totalScore = playerTotal;
    dealer.totalScore = dealerTotal;

    if (playerTotal === 21){ winner = player.name;}
    if (dealerTotal === 21){ winner = dealer.name;}

    if (dealerTotal < 21 && playerTotal < 21){
      var dealerDif = 21 - dealerTotal;
      var playerDif = 21 - playerTotal;
      if (playerDif < dealerDif){ winner = player.name} else { winner = dealer.name; }
    }

    if (playerTotal === dealerTotal){ winner = "tie" };
    if  (playerTotal > 21 && dealerTotal > 21){ winner = "nobody"}
    if (dealerTotal > 21 && playerTotal <= 21){
      winner = player.name;
    }

    if (playerTotal > 21 && dealerTotal <= 21){
      winner = dealer.name;
    }
    console.log(winner);
    console.log(" winner from inside the Aces function");
    return winner;

  }//end of handleAces function

}//end of Deck object functions

function Player (name, hand) {
  this.name = name;
  this.hand = hand;
  this.totalScore = 0;
}

function playerShowCard(card){
  var htmlStr = "<div id='playing_card'><p>" + card.valueString + "</p><img src='"+ card.suiteImg + "'><p id='bottom_val'>" + card.valueString + "</p></div>";
  $("#player_box").append(htmlStr);
}

function dealerShowCard(card){
  var htmlStr = "<div id='playing_card'><p>" + card.valueString + "</p><img src='"+ card.suiteImg + "'><p id='bottom_val'>" + card.valueString + "</p></div>";
  $("#dealer_box").append(htmlStr);
}

function showWinner(winner, bust){
  bust = bust +  " - ";

  var dealerHtmlStr = "<p id='dealer_score'>" + dealer.totalScore + "</p>";
  var playerHtmlStr = "<p id='player_score'>" + player.totalScore + "</p>";
  var winnerHtmlStr = "";
  if(winner == "tie"){winnerHtmlStr = "<p id ='winner_banner'>" + bust + winner + " - " + "</p>";}
  winnerHtmlStr = "<p id ='winner_banner'>" + bust + winner + " wins - " + "</p>";



  $("#dealer_box").append(dealerHtmlStr);
  $("#player_box").append(playerHtmlStr);
  console.log(winnerHtmlStr);
  $("#space").append(winnerHtmlStr);
  $("#hit_button").off();
  $("#stand_button").off();
}


//"main function"
$(document).ready(function (){
  var winner;
  var deck = new Deck();
  deck.initDeck();
  deck.shuffleDeck();

  var ace = new playingCard("A", "heart");
  var two = new playingCard("2", "heart");
  var nine = new playingCard("9", "heart");

//  var playerHand = [ace, ace, nine]; it's still broken for this test case!
//  var dealerHand = [ace, two, two];

  var playerHand = [];
  var dealerHand = [];

  for( var i = 0; i < 2; i++){
    dealerHand.push(deck.hit());
  }

  for(var i = 0; i < 2; i++){
    playerHand.push(deck.hit());
  }

  player = new Player("harry", playerHand);
  dealer = new Player("voldemort", dealerHand);

  dealerShowCard(dealer.hand[0]);
  playerShowCard(player.hand[0]);
  playerShowCard(player.hand[1]);

 $("#hit_button").on("click", function (){
   var card = deck.hit()
   player.hand.push(card);
   playerShowCard(card);
   if(deck.playerHit() > 21){
     $(".dummy_card").remove();
     dealerShowCard(dealer.hand[1]);

     winner = deck.stand();

     if(dealer.hand.length > 2){
       for(var i = 2; i < dealer.hand.length; i++){
         dealerShowCard(dealer.hand[i]);
       }
     }
     showWinner(winner, "bust");

   }
  });

 $("#stand_button").on("click", function(){
   $(".dummy_card").remove();
   dealerShowCard(dealer.hand[1]);

   winner = deck.stand();

   if(dealer.hand.length > 2){
     for(var i = 2; i < dealer.hand.length; i++){
       dealerShowCard(dealer.hand[i]);
     }
   }
   showWinner(winner, "");
  });

$("#new_game").on("click", function(){
  location.reload();
});


})

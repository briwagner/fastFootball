/// <reference path="jquery-1.11.3.js" />;

$('document').ready( function() {

    setTimeout(function() { showBox() }, 2000);

    setDropArea();

    // reset name forms
    $('#player1NameBox').val('');
    $('#player2NameBox').val('');

})

// enable and disable draggable buttons

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
    ev.preventDefault();
}

// my drag events  

function makeDraggable(cardClass) {
    $(cardClass).draggable( {
    containment: "#content",
    cursor: "move",
    helper: 'clone',
});
}

function handleDropEvent(event, ui) {
    var draggable = ui.draggable;
    // transfer card info 
    if  ( draggable.hasClass("offense") ) {
        var newCard = ($(draggable).children());
        $('#bigOffense').append(newCard);
        console.log(newCard.children().contents());
    } else {
        var newCard = ($(draggable).children());
        $('#bigDefense').append(newCard);
        console.log(newCard.children().contents());
    }
    // drop into correct zone
    if (draggable.hasClass("offense")) {
        $('#dropOffense').addClass('hidden'); 
        $('#bigOffense').removeClass('hidden');
    } else {
        $('#dropDefense').addClass('hidden'); 
        $('#bigDefense').removeClass('hidden');
    };
   // switch draggable to other side
    if (draggable.hasClass("offense")) {
        $(".offense").draggable( {disabled: true} );    
        $(".defense").draggable( {disabled: false} ); }
     else {
    // add function to compare cards here
        $('#bigOffense > div').addClass('showIt');
        setTimeout(compare, 1200);
        $(".defense").draggable( {disabled:true} ); 
    };
    draggable.empty();
    // create button for new card
    needCard(draggable);
}

// set drop area
function setDropArea() {
    $('#mainPlayRow').droppable( {
    drop: handleDropEvent
});
}

// player attributes

var player1;
var player2;
var player1Name;
var player2Name;

var p1Points = 0;
var p2Points = 0;

// STARTUP METHODS -- loads upon setTimeout
function showBox() {
    $('#startBox').show();
}
// confirm ready state
function startGame() {
    $('#startBox').hide();
    $('#startBox2').show();
}
// stores player1's name
function startGame2() {
    $('#startBox2').hide();
    $('#startBox3').show();
    if ($('#player1NameBox').val() == "") {
        player1Name = 'Player 1';
    } else {
        player1Name = $('#player1NameBox').val();
    }
    $('#topPlayer > h2').html(player1Name);
    $('#p1Scoreboard').html(player1Name);        
}
//stores player2's name and LAUNCHES GAME
function startGame3() {
    if ( $('#player2NameBox').val() == "" ) {
        player2Name = 'Player 2';
    } else {
        player2Name = $('#player2NameBox').val();
    }
    $('#bottomPlayer > h2').html(player2Name);
    $('#p2Scoreboard').html(player2Name);
    $('#startBox3').hide();
    flip();
    shuffleAll();
    dealTest();
}

//var downs = 1;
var yardsToGo = 80;
var moveTen = 10;
var playDown = 1;
var yardsGained;


var timeLeft = 24;

// Define Cards 

function card(playType, side, yards, imgsrc, turnOver) {
    this.playType = playType;
    this.side = side;
    this.yards = yards;
    this.imgsrc = imgsrc;
    this.turnOver = false;
    this.showCard = function() {
        return '<div class="' + this.playType + '"><img class="cardImg" src="pics/' + this.imgsrc + '" /> <p class="playType">' + this.playType + '</p> <p class="yards">' + this.yards + ' yards</p></div>';
    }    
};
// OFFENSE  four of rush5
var rush5 = new card("Rush", "offense", 5, "rush.jpg");
// two of each 
var rush10 = new card("Rush", "offense", 10, "rush.jpg");
var rush15 = new card("Rush", "offense", 15, "rush.jpg");
// one of these
var rush30 = new card("Rush", "offense", 30, "rush.jpg");
// four of pass5
var pass5 = new card("Pass", "offense", 5, "pass.jpg");
// two of each
var pass10 = new card("Pass", "offense", 10, "pass.jpg");
var pass15 = new card("Pass", "offense", 15, "pass.jpg");
var pass30 = new card("Pass", "offense", 30, "pass.jpg");
var punt40 = new card("Punt", "offense", 40, "punt.jpg");
var kick40 = new card("Kick", "offense", 40, "kick.jpg");
// one of each
var bombPass = new card("Bomb", "offense", 100, "pass.jpg");

// DEFENSE seven of tackle0
var tackle0 = new card("Rush", "defense", 0, "tackle.jpg");
// four of these
var tackle5 = new card("Rush", "defense", 5, "tackle.jpg");
// two of these
var tackle10 = new card("Rush", "defense", 10, "tackle.jpg");
// one of these
var fumble = new card("Rush", "defense", 0, "fumble.jpg");
fumble.turnOver = true;
fumble.showCard = function() {
        return '<div class="' + this.playType + ' turnover"><img class="cardImg" src="pics/' + this.imgsrc + '" /> <p class="playType">' + this.playType + '</p> <p class="yards">' + this.yards + ' yards</p></div>'; } ;
var interception = new card("Pass", "defense", 0, "interception.jpg");
interception.turnOver = true;
interception.showCard = function() {
        return '<div class="' + this.playType + ' turnover"><img class="cardImg" src="pics/' + this.imgsrc + '" /> <p class="playType">' + this.playType + '</p> <p class="yards">' + this.yards + ' yards</p></div>'; };
var bombBlock = new card("Bomb", "defense", 0, "passblock.jpg");
var kickBlock = new card("Kick", "defense", 0, "kickblock.jpg");
var puntBlock = new card("Punt", "defense", 0, "puntblock.jpg"); 
// six pass incomplete
var incompletePass = new card("Pass", "defense", 0, "passblock.jpg");

// var deckOff = [rush5, rush5, rush5, rush5, rush10, rush10, rush15, rush15, rush30, 
//     pass5, pass5, pass5, pass5, pass10, pass10, pass15, pass15, bombPass, punt40, punt40, kick40, kick40];
    
// var deckDef = [tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, tackle5, tackle5, tackle5, tackle5,
//     tackle10, tackle10, fumble, interception, bombBlock, kickBlock, puntBlock, incompletePass, incompletePass, 
//     incompletePass, incompletePass, incompletePass, incompletePass];

var fullDeck = [rush5, rush5, rush5, rush5, rush10, rush10, rush15, rush15, rush30, 
    pass5, pass5, pass5, pass5, pass10, pass10, pass15, pass15, bombPass, punt40, punt40, kick40, kick40,
    tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, tackle5, tackle5, tackle5, tackle5,
    tackle10, tackle10, fumble, interception, bombBlock, kickBlock, puntBlock, incompletePass, incompletePass, 
    incompletePass, incompletePass, incompletePass, incompletePass, rush5, rush5, rush5, rush5, rush10, rush10, rush15, rush15, rush30, 
    pass5, pass5, pass5, pass5, pass10, pass10, pass15, pass15, bombPass, punt40, punt40, kick40, kick40,
    tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, tackle5, tackle5, tackle5, tackle5,
    tackle10, tackle10, fumble, interception, bombBlock, kickBlock, puntBlock, incompletePass, incompletePass, 
    incompletePass, incompletePass, incompletePass, incompletePass];

// shuffle the deck
    
function shuffleAll() {
    shuffleArray(fullDeck);
    $('.offense').empty();
    $('.defense').empty();
    // create buttons for new Cards
    needCard( $('#tCard1') );
    needCard( $('#tCard2') );
    needCard( $('#tCard3') );
    needCard( $('#tCard4') );
    needCard( $('#bCard1') );
    needCard( $('#bCard2') );
    needCard( $('#bCard3') );
    needCard( $('#bCard4') );
}

function shuffleArray(array) {
    $('#oCards').empty();
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
         }
    return array;
}

// deal cards out 
function dealTest(deck) {
    $('.offense').empty();
    $('.defense').empty();
    // assign offense cards
      for (var n = 0; n < 4; n++) {   
        for (var p = 0; p < fullDeck.length; p++) {
          if (fullDeck[p].side == "offense") {
           $('.offense:eq(' + n + ')').append(fullDeck[p].showCard());
           fullDeck.splice(p, 1);
           break;
         } } }
         makeDraggable(".offense"); 
    // assign defense cards     
       for (var n = 0; n < 4; n++) {   
        for (var p = 0; p < fullDeck.length; p++) {
          if (fullDeck[p].side == "defense") {
           $('.defense:eq(' + n + ')').append(fullDeck[p].showCard());
           fullDeck.splice(p, 1);
           break;
         } } }
        makeDraggable(".defense");
        $('.defense').draggable( {disabled:true} );          
}

// hit me one more card
function needCard(emptyCard) {
    var parentID =  $(emptyCard).attr('id');
    var sideClass;
    if ( $(emptyCard).hasClass('offense') ) {
        sideClass = 'offense-button' } 
        else { sideClass = 'defense-button' }
    emptyCard.append('<button type="button" id="' + parentID + '" class="btn btn-default' + " " + sideClass + '" onclick="getNextCard(this.id)">Get a card</button>');
}

var newCard;

function getNextCard(emptyCard) {
    if ( $('#' + emptyCard).hasClass("offense") ) {
        pullNextCard("offense");
     }
        else {
        pullNextCard("defense");
    }
    $('#' + emptyCard).empty();
    $('#' + emptyCard).append('<div class="' + newCard.playType + '"> <img class="cardImg" src="pics/' + newCard.imgsrc + '" /><p class="playType">' + newCard.playType + '</p> <p class="yards">' + newCard.yards + ' yards</p></div>');
}

function pullNextCard(sideOfBall) {
    for (var i = 0; i < fullDeck.length; i++) {
      if (fullDeck[i].side == sideOfBall) {
        newCard = fullDeck[i];
        fullDeck.splice(i, 1);
        return newCard; }
    }
}

// flip a coin
function flip() {
    var coin = Math.random();
    if (coin < 0.5){
        player1 = true;
        player2 = false;
    } else {
        player1 = false;
        player2 = true;
    }
    if (player1) {
        playMarquee('player1');
    } else {
        playMarquee('player2');
    }
    assignNew();
}

// assign play side -- true is offense 
function assign() {
    // yardsToGo = 80;
    if (player1) {
        for (var i = 0; i < 5; i++) {
            $('#tCard' + i).removeClass('defense');
            $('#tCard' + i).addClass('offense'); }
        for (var j = 0; j < 5; j++) {
            $('#bCard' + j).removeClass('offense');
            $('#bCard' + j).addClass('defense');
            }
    } else {
        for (var i = 0; i < 5; i++) {
            $('#bCard' + i).removeClass('defense');
            $('#bCard' + i).addClass('offense'); }
        for (var j = 0; j < 5; j++) {
            $('#tCard' + j).removeClass('offense');
            $('#tCard' + j).addClass('defense');
        }
    }
}

function assignNew() {
    assign();
    setBall();
}

// re-assign ball after turn over
function assignTO() {
    assign();
}

// set ball
function setBall() {
    yardsToGo = 80;
    playDown = 1;
    moveTen = 10;
    if (player1) {
        ballPos = $('#ball').css('left', '884px');
    } else {
         ballPos = $('#ball').css('left', '266px');   
    }
}

// re-assign after turnover -- do not move ball
// function assignTO() {
//     if (player1) {
//         for (var i = 0; i < 5; i++) {
//             $('#tCard' + i).removeClass('defense');
//             $('#tCard' + i).addClass('offense'); }
//         for (var j = 0; j < 5; j++) {
//             $('#bCard' + j).removeClass('offense');
//             $('#bCard' + j).addClass('defense');
//         }
//         } else {
//             for (var i = 0; i < 5; i++) {
//                 $('#bCard' + i).removeClass('defense');
//                 $('#bCard' + i).addClass('offense'); }
//             for (var j = 0; j < 5; j++) {
//                 $('#tCard' + j).removeClass('offense');
//                 $('#tCard' + j).addClass('defense');
//             }
//         }
// }

function switchSides() {
    fadePlay();
    if (player1) {
        player2 = true;
        player1 = false;
    } else {
        player1 = true;
        player2 = false;
    }
    assignNew();
    $(".offense").draggable( {disabled: false} );
    $(".defense").draggable( {disabled: true} );
    dealTest();
}

// re-assign after turnover -- do not move ball
function switchSidesTO() {
    fadePlay();
    if (player1) {
        player2 = true;
        player1 = false;
    } else {
        player1 = true;
        player2 = false;
    }
    // re assign card areas
    assignTO();
    $(".offense").draggable( {disabled: false} );
    $(".defense").draggable( {disabled: true} );
    // deal new cards
    dealTest();
    // flip yards to other endZone
    yardsToGo = 100 - yardsToGo;
    // reset downs to 1
    playDown = 1;
    moveTen = 10;
    $('#downNumber').html(playDown);
}

// PLAY ZONE FUNCTIONS DEFINED HERE
// clear drop zones after play 
function fadePlay() {
    $('#bigOffense').fadeOut(800);
    $('#bigDefense').fadeOut(800, 'swing');
    window.setTimeout( clearPlay, 1000);
}

function clearPlay() {
    $("#bigOffense").empty();
    $("#bigOffense").addClass("hidden");
    $("#bigDefense").empty();
    $("#bigDefense").addClass("hidden");    
    $('#dropOffense').removeClass('hidden');
    $('#dropDefense').removeClass('hidden');
    $(".offense").draggable( {disabled: false} );
    $(".defense").draggable( {disabled: true} );
    //$('#marquee').empty(); 
    // restore div to visible
    $('#bigOffense').css('display', 'block');
    $('#bigDefense').css('display', 'block'); 
}

/* show in marquee result of play -- defense plays*/
function playMarquee(playType, yardsGained) {
    switch(playType) {
        case "player1":
        $("#marquee").html('<marquee scrollamount="25" loop="1">' + player1Name + ' has the ball</marquee>');
        break;
        case "player2":
        $("#marquee").html('<marquee scrollamount="25" loop="1">' + player2Name + ' has the ball</marquee>');
        break;
        case "Rush":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Defense stops the run for ' + yardsGained + ' yards</marquee>');
        break;
        case "Pass":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Breaks up the pass for 0 yards</marquee>');
        break;
        case "Bomb":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Knocks down the pass in the endzone</marquee>');
        break;
        case "Kick":
        $("#marquee").html('<marquee scrollamount="25" loop="1">The kick is NO good</marquee>');
        break;
        case "Punt":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Defense blocks the punt</marquee>');
        break;
        case "LoseBall":
        $('#marquee').html('<marquee scrollamount="25" loop="1">Offense loses the ball, defense recovers</marquee>');
        break;
        case "Touchdown":
        $('#marquee').html('<marquee scrollamount="25" loop="1">It\'s a Touchdown!</marquee>');
        break;
        case "OnDowns":
        $('#marquee').html('<marquee scrollamount="25" loop="1">Offense turns the ball over on downs</marquee>');
        break;
        default:
        console.log("error");
    }
}
// show result of offensive plays
function playMarqueeOff(playType, offensiveYards) {
    switch(playType) {
        case "Rush-O":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Offense runs for ' + offensiveYards + ' yards</marquee>');
        break;
        case "Pass-O":
        $("#marquee").html('<marquee scrollamount="25" loop="1">QB throws for ' + offensiveYards + ' yards</marquee>');
        break;
        case "Bomb-O":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Deep into the endzone for a TD</marquee>');
        break;
        case "Kick-O":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Field goal is up from ' + yardsToGo + ' yards away</marquee>');
        break;
        case "Kick-O-Bad":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Field goal is NO good from ' + yardsToGo + ' yards away</marquee>');
        break;
        case "Punt-O":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Punter lets it go for ' + offensiveYards + ' yards</marquee>');
        break;
        case "Punt-Long":
        $("#marquee").html('<marquee scrollamount="25" loop="1">Punter lets it go into the end zone</marquee>');
        break;
        default:
        console.log('error in marquee');
    }
}

var offensivePlay; 

function compare() {
    // time runs down
    timeLeft--;
    $('#timeLeft').html(timeLeft);
    // compare play
    var offensivePlay = $('#bigOffense > div > p:first').html();
    var offensiveYards = $('#bigOffense > div > p:last').html().replace(/\D/g, "");
    
    var defensivePlay = $('#bigDefense > div').attr('class');
    var defensiveYards = $('#bigDefense > div > p:last').html().replace(/\D/g, "");
    // check for turnover class and run switchSide
    if ( $('#bigDefense > div').hasClass('turnover') && offensivePlay.substring(0,1) == defensivePlay.substring(0,1) ) {
        playMarquee("LoseBall");
        window.setTimeout(switchSidesTO, 700 );
        fadePlay();
    } else {
  // if plays match, run first half of statement
    if ( offensivePlay == defensivePlay ) {
        switch(defensivePlay) {
            case "Rush":
                compareRush(defensiveYards, offensiveYards);
                playMarquee("Rush", yardsGained);
                // if (yardsGained > 0) { moveBall(yardsGained);}
                break;
            case "Pass":
                playMarquee("Pass", yardsGained);
                break;
            case "Bomb":
                playMarquee("Bomb");
                yardsGained = 0;
                break;
            case "Kick":
                yardsGained = 0;
                playMarquee("Kick");
                switchSidesTO();
                return;
                break;
            case "Punt":
                yardsGained = 0;
                playMarquee("Punt");
                switchSidesTO();
                return;
                break;
            default:
                console.log("Broken play");
        }
    } 
    // plays don't match, OFFENSE wins
    else {
        yardsGained = parseInt(offensiveYards);
        switch(offensivePlay) {
            case "Rush":
                playMarqueeOff("Rush-O", yardsGained);
                moveBall(yardsGained);
                break;
            case "Pass":
                playMarqueeOff("Pass-O", yardsGained);
                moveBall(yardsGained);
                break;
            case "Bomb":
                endZone();
                playMarqueeOff("Bomb-O");
                scoring(7);
                window.setTimeout(switchSides, 2400);
                // window.setTimeout(assignNew, 1800);
                return;
                break;
            case "Kick":
                if (offensiveYards > yardsToGo) {
                // kick is good -- trigger touchdown and move ball to TD
                    endZone();
                    playMarqueeOff("Kick-O", yardsToGo);
                    scoring(3);
                    window.setTimeout(switchSides,2600);
                    // window.setTimeout(assignNew,1800);
                    return;
                } else {
                    // kick is NO good -- turn over ball
                    yardsGained = yardsGained - offensiveYards;
                    playMarqueeOff("Kick-O-Bad");
                    window.setTimeout(switchSidesTO,1200);
                }
                break;
            case "Punt":
            // check if ball goes into endZone
                if (yardsToGo <= 40) {
                    playMarqueeOff("Punt-Long");
                    switchSides();
                    return;
                    } 
                else {
                    playMarqueeOff("Punt-O", yardsGained);
                    moveBall(yardsGained); 
                    yardsToGo = yardsToGo - yardsGained;
                    switchSidesTO(); 
                    fadePlay();
                    gameOver();
                    return;
                }
                break;
            default:
                console.log('broken play');
        } 
    }
    if ( yardsGained >= 10) {
        playDown = 1;
        $('#downNumber').html(playDown);
    } else {
        playDown++;
        $('#downNumber').html(playDown);
    }
    ytg(yardsGained);
    // remove play cards from big area
    fadePlay(); 
    // turn over ball after 4th down
    if (playDown == 5) {
        window.setTimeout(function() {playMarquee("OnDowns")},3200);
        window.setTimeout(switchSidesTO,3800);
    }
    } 
    // check if run or pass into endZone
    if (yardsToGo <= 0) {
        endZone();
        scoring(7);
        window.setTimeout(function() {playMarquee("Touchdown")}, 3200);
        window.setTimeout(switchSides, 3800);
    }
    gameOver();
}

function compareRush(defensiveYards, offensiveYards) {
    if (defensiveYards > 5) {
        var compareYards = defensiveYards - offensiveYards;
        if (compareYards > 0) {
            yardsGained = offensiveYards;
        } else {
            yardsGained = defensiveYards;
        }
         }
        else {
            yardsGained = defensiveYards;
        } 
    console.log(defensiveYards + " " + offensiveYards + " " + yardsGained);
    if (yardsGained > 0) {
    moveBall(parseInt(yardsGained)); }
}

// process yardsToGo to endzone || and moveTen for first down
function ytg(yardsGained) {
    // global yards
    yardsToGo = yardsToGo - yardsGained;
    // check if entered end-zone
    // if (yardsToGo == 0) {
    //     endZone();
    //     scoring(7);
    //     playMarquee("Touchdown");
    //     window.setTimeout(switchSides, 2200);
    // }
    // first down yards
    moveTen = moveTen - yardsGained;
    if (moveTen <= 0) {
        moveTen = 10;
        playDown = 1;
        $('#downNumber').html(playDown);
    }
} 

// move the ball

var ballPos;

function moveBall(yardsGained) {
    var x;
    var y;
    if (player1) {
        y = 1;
    } else {
        y = -1;
    };
    switch(yardsGained) {
        case 5:
        x = 1;
        break;
        case 10:
        x = 2;
        break;
        case 15:
        x = 3;
        break;
        case 30:
        x = 6;
        break;
        case 40:
        x = 8;
        break;
        default:
        x = 4;
        console.log('error');
    } 
    console.log(5 * x + " yards");
    if (y > 0) {
    $('#ball').animate( {left: "-=" + (52*x)} , 1200);
    } else {
    $('#ball').animate( {left: "+=" + (52*x)} , 1200);
    }
    // ballPos = $('#ball').css('left');
    // ballPos.replace(/\D/g, "");
    // ballPos = parseInt(ballPos) - (52 * x * y);
    // $('#ball').css('left', ballPos + "px");
}

// animates ball moving into end-zone
function endZone() {
    if (player1) {
        $('#ball').animate({ left: '10px' }, 1200);
    } else {
        $('#ball').animate({ left: '1140px'}, 1200);
    }
}

// scoring function 7 or 3
function scoring(pts) {
    if (player1) {
        p1Points = p1Points + pts;
        $('#p1Points').empty().append(p1Points)
    } else {
        p2Points = p2Points + pts;
        $('#p2Points').empty().append(p2Points); 
    }
}

// end game -- disable draggables
function gameOver() {
    if (timeLeft == 0) {
        $('.defense').draggable( {disabled:true} );
        $('.offense').draggable( {disabled:true} );
        var winner;
        if (p1Points == p2Points) {
            winner = "Game ends in a tie."
        }
        else if (p1Point > p2Points) {
            winner = "Game over. Player 1 wins";
        } else {
            winner = "Game over. Player 2 wins";
        }
       function marqueeGameOver() {
        $("#marquee").html('<marquee scrollamount="25" loop="1">' + winner + '</marquee>');
        }
        window.setTimeout(marqueeGameOver, 3400);
    }
}

// debug 

function showYards() {
    $('#yardsToGo').html(yardsToGo);
    $('#yardsGained').html(yardsGained);
    $('#playDown').html(playDown);
    $('#moveTen').html(moveTen);
}


/// end of code

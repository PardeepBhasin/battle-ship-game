/**
 * main class to start game
 * get input from text file
 */
var inputData = require('./input/input');
var playerFactory = require('./app/factory/PlayerFactory');
var console = require('./app/logging/console');

function gameStart(inputData){
    var playerOne;
    var playerTwo;
    try {
        playerOne = playerFactory(inputData, 'playerOne');
        playerTwo = playerFactory(inputData, 'playerTwo');    
        playerOne.setOpponent(playerTwo);
        playerTwo.setOpponent(playerOne);
        playerOneChance();
    } catch (error) {
        console.logLn('Input Error:'+error)
    }    
    /** start automatic logic to start game */
    function playerOneChance(){
            var result = playerOne.turnToPlay();
            if(!result){
                if(playerTwo.getTargetList().length>0){
                        playerTwoChance(); 
                    }else{
                        console.logLn('Battle Is Draw.');
                    }
                    return;
            }
            if(result.isHit){
                if(result.winner){
                    console.logLn(playerOne.name+' won the battle.');
                    return;
                }else{ 
                    playerOneChance();
                }
            } else {
                playerTwoChance();
                return;
        }
    }
    function playerTwoChance(){
            var result = playerTwo.turnToPlay()
            if(!result){
                playerOneChance(); 
                return; }
            if(result.isHit){
                if(result.winner){
                    console.logLn(playerTwo.name+' won the battle.');
                    return;
                }else{ 
                    playerTwoChance();
                    return;
                }
            }else{
                playerOneChance()
                return;
            }
    }
}

gameStart(inputData);
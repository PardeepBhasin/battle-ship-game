var fs = require('fs');
var inputString = fs.readFileSync('./input/data.txt', 'utf8');
// console.log(inputString);

 /** you can put input constrain here  */
//  Constraints:
// 1 <= Width of Battle area (M’) <= 9,
// A <= Height of Battle area (N’) <= Z
// 1 <= Number of battleships <= M’ * N’
// Type of ship = {‘P’, ‘Q’}
// 1 <= Width of battleship <= M’
// A <= Height of battleship <= N’
// 1 <= X coordinate of ship <= M’
// A <= Y coordinate of ship <= N’
// 5 E
// 2
// Q 1 1 A1 B2
// P 2 1 D4 C3
// A1 B2 B2 B3
// A1 B2 B3 A1 D1 E1 D4 D4 D5 D5
var gameInput  = inputString.split("\n");
// console.log(gameInput);
var battleFieldDimensional = gameInput[0];
var noOfShips = parseInt(gameInput[1]);
// console.log('Total number of ships : '+noOfShips)
var playerShips = {
    playerOne:[],
    playerTwo:[]
};
for( var i=2; i < noOfShips+2; i++ ){
    var ships = createShipDetails(gameInput[i])
    playerShips.playerOne.push(ships.playerOne);
    playerShips.playerTwo.push(ships.playerTwo);

}
// console.log('Ships width, height, placement and type.. ');
// console.log(playerShips);
/** get ship details for each player */


var playerOneHitTargetList =  listOfTarget(gameInput[gameInput.length-2]);
var playerTwoHitTargetList =  listOfTarget(gameInput[gameInput.length-1]);
// console.log('---- Player One Hit Target -----');
// console.log(playerOneHitTargetList);
// console.log('---- Player Two Hit Target -----');
// console.log(playerTwoHitTargetList);

function battleFieldDimension(input){
    return {
        width:input.split(" ")[0],
        height:input.split(" ")[1]
    }
}
function listOfTarget(input){
    return input.split(" ");
}
function createShipDetails(input){
    //Q 1 1 A1 B2
    var inputList = input.split(" ");
    var shipOneDim = {
        name:'Ship-P1-',
        type: inputList[0],
        width: inputList[1],
        height: inputList[2],
        position: inputList[inputList.length-2]
    };
    var shipTwoDim = { 
        name:'Ship-P2-',
        type: inputList[0],
        width: inputList[1],
        height: inputList[2],
        position: inputList[inputList.length-1]
    }
    return {
        playerOne:shipOneDim,
        playerTwo:shipTwoDim
    }

}

module.exports  = { 
    battleField : battleFieldDimension(battleFieldDimensional),
    noOfShips:noOfShips,
    allShips:playerShips,
    targetList:{
         playerOne:playerOneHitTargetList,
         playerTwo:playerTwoHitTargetList
    }

 }
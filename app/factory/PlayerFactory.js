/**
 * player factory
 */
var Player = require('../player/Player');
var shipFactory  = require('./ShipFactory');
var battleFieldFactory  = require('./BattleAreaFactory');
var playerFactory  = function(options, playerName) {
    var ships = [];
    var shipDetailsList = options.allShips[playerName];
    var count = 0;
    while(count<options.noOfShips){
        var details = shipDetailsList[count];
        details.name = details.name+count;
        ships.push(shipFactory(details))
        count++;
    }
    /** create battle area using factory */
    /**
     * create battle area and ship 
     * and then assign to player
     */
    
    var battleAreaDetails = {
        name:playerName,
        width:parseInt(options.battleField.width),
        height:options.battleField.height,
        ships:ships
    }
    var battleArea = battleFieldFactory(battleAreaDetails);
    /** option for player constructor */
    var player = new Player(playerName);
    player.setBattleArea(battleArea);
    player.setTargetList(options.targetList[playerName]);
    return player;
}
module.exports = playerFactory;
/**
 * This factory will create BattleField object using 
 * required options 
 */
var BattleArea = require('../battleArea/BattleArea');
var battleAreaFactory = function(options){
    var battleArea = new BattleArea(options.width, options.height, options.name);
    battleArea.setShips(options.ships);
    battleArea.printBattleArea();
    return battleArea;
}
module.exports = battleAreaFactory;
/** Player Class */
var console = require('../logging/console')
var Player = function(name) {
    this.name = name;
    this.opponent;
    this.battleArea;
    this.targetList;
    this.setOpponent = function (_opponent) {
        this.opponent = _opponent;
    }
    this.getOpponent = function () {
        return this.opponent;
    }
    this.setBattleArea = function (battleField) {
        this.battleArea = battleField;
    }
    this.getBattleArea = function () {
        return this.battleArea;
    }
    this.setTargetList = function (_targetList) {
        this.targetList = _targetList;
    }
    this.getTargetList = function () {
        return this.targetList;
    }
    /**current player get its turn to shoot missile 
     * in this function player maintain the list target pick one by one from 
     * targetList give already
     */
    this.turnToPlay = function(){
        if(this.targetList.length==0){
            console.logLn(this.name + '  has no more missiles left to launch')
            return null;
        }
        var currentTarget = this.targetList.shift();
        return this.attack(currentTarget);
    }
    /** here this player hit opponent battle area and give weather a hit or miss  */
    this.attack = function(targetCoordinates){
       var result =  this.opponent.battleArea.targetShip(targetCoordinates); 
       console.logLn(this.name+' fires a missile with target '+targetCoordinates+ ' which got '+(result.isHit ? '\"Hit\"':'\"Miss\"'));
       /** check all ship of opponent for winner*/
       if(result.winner) {
            console.logLn('Congratulation !!!! Winner  is '+this.name)
       }
       return result;
    }
}

module.exports = Player;
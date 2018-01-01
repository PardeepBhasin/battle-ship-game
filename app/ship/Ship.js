/**
 *  option will be  { name:'', type:'P', width:2, height:1, positionX:'', positionY:'', live:''}
*/
var Ship = function (options) {
    this.name = options.name; //initial name
    this.type = options.type; // either 'P' or 'Q'
    this.isDestroyed = false;
    this.widthOfBattleShip = options.width;
    this.heightOfBattleShip = options.height;
    this.positionX = options.positionX;  // 1,2,3,4,5 BattleAreaWidth
    this.positionY = options.positionY  // A,B,C .. BattleAreaHeight
    this.lives = (options.type == 'Q' ? (options.width * options.height) * 2 : (options.width * options.height));;
    this.positionOnBattleArea;
    this.getName = function () {
        return this.name;
    }
    this.getType = function () {
        return this.type;
    }
    this.getWidthOfBattleShip = function () {
        return this.widthOfBattleShip;
    }
    this.getHeightOfBattleShip = function () {
        return this.heightOfBattleShip;
    }
    this.getPositionX = function () {
        return this.positionX;
    }
    this.getPositionY = function () {
        return this.positionY;
    }
    this.setIsDestroyed = function (_isDestroyed) {
        this.isDestroyed = _isDestroyed;
    }
    this.getIsDestroyed = function () {
        return this.isDestroyed;
    }
    this.setPositionOnBattleArea = function (_position) {
        this.positionOnBattleArea = _position;
    }
    this.getPositionOnBattleArea = function () {
        return this.positionOnBattleArea;
    }
    this.updateLive = function () {
        this.lives--;
        if (this.lives == 0) {
            this.isDestroyed = true;
        }
    }

}
module.exports = Ship;
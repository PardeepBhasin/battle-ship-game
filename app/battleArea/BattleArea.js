
/** Dependencies list */
var Constants = require('../constants/Constants');
var console = require('../logging/console');
/**
 * This module represents Battle Area of each player
 * This also have method to create battle area(Board Of Blocks) according to basic input 
 * like '5 E' where 5 is Width and E is height from (A, B, C, D, E)
 * It's constructor will take two params width, height to create  Battle area
 */


var BattleArea = function(_width, _height,_name) {
    /**this array hold field board a multi dimensional array */
    this.battleArea = [];
    this.ships = [];
    this.name= _name;
    this.battleAreaWidth = _width;
    this.battleAreaHeight = Constants.BATTLE_AREA_HEIGHT_ENUM[_height]
}
BattleArea.prototype.printBattleArea = function(){
    console.logLn("--------BATTLE FIELD<"+this.name+">-----------");
    console.logLn('');
        console.log('\t');
        for (var i = 0; i < this.battleAreaWidth; i++) {
            console.log((i + 1) + '\t');
        }
        console.logLn('');
        for (var i = 0; i < this.battleAreaHeight; i++) {
            console.log(Constants.BATTLE_AREA_LETTERS[i] + '\t');
            for (var j = 0; j < this.battleAreaWidth; j++) {
                console.log(this.battleArea[i][j] + '\t');
            }
            console.logLn('');
        }
}
BattleArea.prototype.createBattleArea = function () {
    // console.logLn('Creating Battle Area ....')
    for (var i = 0; i < this.battleAreaHeight; i++) {
        this.battleArea[i] = [];
        for (var j = 0; j < this.battleAreaWidth; j++) {
            this.battleArea[i][j] = Constants.BATTLE_AREA_ICON
        }
    }
    return this;
};
BattleArea.prototype.setShips = function (shipsList) {
    this.ships = shipsList;
     /** before setting ships into battle field we need to create Battle Area */
    this.createBattleArea()
   // console.logLn('Adding ships to battle area ....')
    this.placeShipInBattleArea();
}
BattleArea.prototype.placeShipInBattleArea = function () {
    //console.logLn("Alright >> Time to place out your ships:"+this.ships.length);
    shipLoop:for(var i = 0; i < this.ships.length; i++) {
        /** calculate ship coordinate according to its size and positionX and positionY */
        var shipCoordinates
            shipCoordinates = this.createShipCoordinates(this.ships[i], this);
            this.ships[i].setPositionOnBattleArea(shipCoordinates);
        /** 
        * we must write the logic if position if already occupied by other ship or not
        */
        for (var j = 0; j < shipCoordinates.length; j++) {
                var cord = shipCoordinates[j];
                //try {
                    if(this.alreadyOccupiedCoordinates(cord)){
                        throw new Error ('This Position is Already occupied by other ship');
                    } else {
                    this.battleArea[cord.x][cord.y] = Constants.BATTLE_SHIP_ICON;                    
                    }
        }
    }
}
BattleArea.prototype.alreadyOccupiedCoordinates = function(position){
    return this.battleArea[position.x][position.y] == Constants.BATTLE_SHIP_ICON
    
}

BattleArea.prototype.createShipCoordinates = function(ship, battleArea){
    var locations = [];
    var pos = {
        x: Constants.BATTLE_AREA_HEIGHT_ENUM[ship.getPositionX()] - 1,
        y: ship.getPositionY() - 1,
        live: ship.type == 'P' ? 1 : 2
    }
    var w = ship.getWidthOfBattleShip();
    var h = ship.getHeightOfBattleShip(); 
    for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
            var cords = { x: pos.x + i, y: pos.y + j, live: pos.live }
            /** check whether these coordinates lie in battle field */
            if ((cords.x > (battleArea.battleAreaHeight - 1)) || (cords.y > (battleArea.battleAreaWidth - 1))) {
                throw new Error('Wrong Coordinates for this ship:' + ship.name);
                return;
            }
            locations.push(cords);
        }
    }
    // console.logLn('-----------------------------');
    // console.logLn(JSON.stringify(locations));
    // console.logLn('-----------------------------');
    return locations;
}
BattleArea.prototype.hitCoordinates = function(fire){
    var position = fire.split(""); //A1
    var coordinates = { 
        x:Constants.BATTLE_AREA_HEIGHT_ENUM[position[0]]-1, 
        y:position[1]-1
    }
    return coordinates;
}
BattleArea.prototype.updateShipOnBattleArea  = function(ship){
   // console.logLn("Alright >> Time to update ship:");
    var shipCoords = ship.getPositionOnBattleArea(); 
   // console.logLn(JSON.stringify(shipCoords))
    for (var j = 0; j < shipCoords.length; j++) {
        var cord = shipCoords[j];
            if (cord.live == 0) {
                // console.logLn('HIT !!!')
                this.battleArea[cord.x][cord.y] = Constants.BATTLE_SHIP_DESTROYED_ICON;
            }
            if (ship.getType()=='Q' && cord.live == 1) {
                // console.logLn('PARTIAL HIT !!')
                this.battleArea[cord.x][cord.y] = Constants.BATTLE_SHIP_PARTIAL_DESTROYED_ICON;
            }
    }
    this.printBattleArea();
}
/** this function will check whether hit or not if hit update the ship live and update board 
     * this will also check whole ship is destroyed or not
    */
BattleArea.prototype.targetShip = function(hitPoint){
        
       // console.logLn('Player hit on ' + hitPoint)
       var result = {
        isHit:false,
        winner:false
    }
    var hitCoordinate = this.hitCoordinates(hitPoint);
   // console.logLn(JSON.stringify(hitCoordinate))
    for (var i = 0; i < this.ships.length; i++) {
        var blocks = this.ships[i].getPositionOnBattleArea();
        for (var j = 0; j < blocks.length; j++) {
            if (hitCoordinate.x == blocks[j].x && hitCoordinate.y == blocks[j].y && blocks[j].live != 0) {
                var updateCoords = { x: blocks[j].x, y: blocks[j].y, live: blocks[j].live - 1 };
                blocks[j] = updateCoords
                result.isHit = true;
                break;
            }
        }
        if (result.isHit) {
            this.ships[i].setPositionOnBattleArea(blocks);
            /** decrement live of attacked ship by one */
            this.ships[i].updateLive();
            this.updateShipOnBattleArea(this.ships[i])
            break;
        }
    }
    // if (!result.isHit) { console.logLn('Player Hit is Missed On ' + hitPoint); }
    /** check all ship are destroy de declare winner */
    if(result.isHit){
        result.winner = this.allShipDestroyed();
    }
    return result;
    }
BattleArea.prototype.allShipDestroyed = function(){
    return this.ships.every(function( value ) {
        return value.isDestroyed;
     })
}

module.exports = BattleArea;
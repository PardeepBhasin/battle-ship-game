/**
 * this factory will create ship with required 
 * options
 */
var Ship = require('../ship/Ship');
var shipFactory = function(shipDetails) {
    var position = shipDetails.position.split(""); //A1
     /**
     *  option will be  { name:'', type:'P', width:2, height:1, positionX:'', positionY:'', live:''}
     */
    var options = { 
        name:shipDetails.name,
        type:shipDetails.type,
        width:parseInt(shipDetails.width),
        height:parseInt(shipDetails.height),
        positionX:position[0],
        positionY:position[1]
    }
    return  new Ship(options);
}
module.exports = shipFactory;
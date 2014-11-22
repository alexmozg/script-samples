/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function (creep, nsrc) {

     {
    
    	if(creep.energy < creep.energyCapacity) {
    		var sources = creep.pos.findNearest(Game.SOURCES
    		  , { filter: function(object) { return object.energy >= 10;}}
    		  );
    		//creep.moveTo(sources[nsrc]);
    		//creep.harvest(sources[nsrc]);
    	    creep.moveTo(sources);
    		creep.harvest(sources);
    	}
    	else {
    		creep.moveTo(Game.spawns.Spawn1);
    		creep.transferEnergy(Game.spawns.Spawn1);
    	}
    }
}

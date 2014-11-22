/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('pickuper'); // -> 'a thing'
 */
 module.exports = function (creep) {
 
    var target = creep.pos.findNearest(Game.DROPPED_ENERGY, {
            filter: function(object) {
                //if (!Memory.energys) return true;
                var path = creep.pos.findPathTo(object, {'maxOps': object.energy+1});
                return (!(object.pos in Memory.energys) || (Memory.energys[object.pos] == creep.name) || Memory.energys[object.pos] === '') && 
                    (creep.energyCapacity - creep.energy >= object.energy + path.length) && path.length < object.energy+1;
            }
        });
        if (target) {
            //if (!(target.pos in Memory.energys))
            Memory.energys[target.pos] = creep.name;
            //creep.memory.target = target.pos;
            creep.moveTo(target);
            if (creep.pickup(target) == Game.OK){
                delete Memory.energys[target.pos];   
            }
        }
        else {
            if (creep.energy>0) {
                creep.moveTo(Game.spawns.Spawn1);
    		    creep.transferEnergy(Game.spawns.Spawn1);
            } else {
    		
	            if (Game.flags.Flag1) creep.moveTo(Game.flags.Flag1);
	            else if (!creep.pos.inRangeTo(Game.spawns.Spawn1, 2))
	                creep.moveTo(Game.spawns.Spawn1);
            }
    	}
 };

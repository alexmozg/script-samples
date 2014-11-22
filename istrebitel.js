/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('istrebitel'); // -> 'a thing'
 */
module.exports = function (creep) {
    var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if (target){
        if (creep.pos.inRangeTo(target, 2) || creep.pos.inRangeTo(target, 1)) {
            var idir = creep.pos.getDirectionTo(target);
            idir = (idir+4+8) % 8;
            creep.rangedAttack(target);
            if (creep.move(idir) != Game.OK)
                if (creep.move((idir+1) % 8) != Game.OK) creep.move((idir-1) % 8);
        } else if (creep.pos.inRangeTo(target, 3)) {
            creep.rangedAttack(target);
        } else  {
            creep.moveTo(target);
        }
    } else {
        if (Game.flags.Flag1) creep.moveTo(Game.flags.Flag1);
	        else if (!creep.pos.inRangeTo(Game.spawns.Spawn1, 2))
	            creep.moveTo(Game.spawns.Spawn1);
    }
}

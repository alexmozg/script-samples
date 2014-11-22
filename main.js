var creep_type_count = 6;
var autospawn = [
//   h  g   i   c   b   p
    [3, 0,  0,  0,  0,  0],
    [3, 1,  0,  0,  0,  0],
    [3, 1,  0,  1,  0,  0],
    [3, 2,  0,  1,  0,  0],
    [4, 2,  1,  1,  0,  1],
    [4, 2,  2,  1,  0,  1],
    [5, 2,  2,  1,  0,  1],
    [6, 2,  2,  1,  0,  1],
    [6, 3,  2,  2,  0,  1]
];

var creep_data = {
    'name' : ['harvester', 'guard', 'istrebitel', 'clirik', 'builder', 'pickuper'],
    'count' : [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
    'body' : [
        [Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE],      //220
        [Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.MOVE, Game.ATTACK],  //310
        [Game.TOUGH, Game.RANGED_ATTACK, Game.MOVE],                    //175
        [Game.HEAL, Game.MOVE],                                         //250
        [Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE],      //170
        [Game.CARRY, Game.CARRY, Game.MOVE]                             //150
        ]
};

var harvester = require('harvester');
var istrebitel = require('istrebitel');
var pickuper = require('pickuper');

var nsrc = 0;
var nharv = 0;

//alert(creep_data.count[0]);

if (!('energys' in Memory)) Memory.energys = {};
if (!('autospawn_n' in Memory)) Memory.autospawn_n = 0;

for (var c=0; c < creep_type_count; c++) {
    creep_data.count[c][0] = autospawn[Memory.autospawn_n][c];
    for (var i=0; i < creep_data.count[c][0]; i++) {
    
        var hname = creep_data.name[c] + i.toString();
        if (!Game.creeps.length || !(hname in Game.creeps) ) {
            if (Game.spawns.Spawn1.spawning === null) {
                Game.spawns.Spawn1.createCreep( creep_data.body[c], hname, {'role' : creep_data.name[c]});
            }
        }
    }
}

for(var cname in Game.creeps) {
	var creep = Game.creeps[cname];

    
	if(creep.memory.role == 'harvester') {
		harvester(creep, nsrc);
		nharv++;
		if (nharv>3){
		    nsrc = 1;
		}
		creep_data.count[0][1]++;
	}
	
    if(creep.memory.role == 'guard') {
	    var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	    if(target) {
	    	creep.moveTo(target);
		    creep.attack(target);
	    }
	    else {
	        if (Game.flags.Flag1) creep.moveTo(Game.flags.Flag1);
	        else if (!creep.pos.inRangeTo(Game.spawns.Spawn1, 2))
	            creep.moveTo(Game.spawns.Spawn1);
    	}
    	creep_data.count[1][1]++;
	}
    if(creep.memory.role == 'istrebitel') {
		istrebitel(creep);
		creep_data.count[2][1]++;
	}
	if(creep.memory.role == 'clirik') {
	    var targets = creep.room.find(Game.MY_CREEPS);
	    var nh = -1;
	    for (var j = 0; j < targets.length; j++){
	        if(targets.length && (targets[j].hits < targets[j].hitsMax)) {
	    	    nh = j;
	        }
	    }
	    if (nh >= 0){
	        creep.moveTo(targets[nh]);
		    creep.heal(targets[nh]);
	    }
	    else {
	        if (Game.flags.Flag1) creep.moveTo(Game.flags.Flag1);
	        else if (!creep.pos.inRangeTo(Game.spawns.Spawn1, 2))
	            creep.moveTo(Game.spawns.Spawn1);
    	}
    	creep_data.count[3][1]++;
	}
	if(creep.memory.role == 'builder') {
	
		if(creep.energy === 0) {
			creep.moveTo(Game.spawns.Spawn1);
			Game.spawns.Spawn1.transferEnergy(creep);
		}
		else {
			var targets = creep.room.find(Game.CONSTRUCTION_SITES);
			if(targets.length) {
				creep.moveTo(targets[0]);
				creep.build(targets[0]);
			}
			else {
			    if (!creep.pos.inRangeTo(Game.spawns.Spawn1, 2))
	                creep.moveTo(Game.spawns.Spawn1);
			}
		}
		creep_data.count[4][1]++;
	}
	
	
	
	if(creep.memory.role == 'pickuper') {
	    pickuper(creep);
	    creep_data.count[5][1]++;
	}
}

var b = true;
for (var i =0; i < creep_type_count; i++)
    b = b && (creep_data.count[i][0] == creep_data.count[i][1]);
if (b && Memory.autospawn_n < autospawn.length-1)
    Memory.autospawn_n ++;
/**/

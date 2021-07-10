//import modules
require('prototype.creep'); // common code for all creeps
require('prototype.tower'); // common code for all towers
require('prototype.spawn'); // common code for spawn

module.exports.loop = function () {
  // check for memory entries of dead creeps by iterating over Memory.creeps
  for (let name in Memory.creeps) {
      // and checking if the creep is still alive
      if (Game.creeps[name] == undefined) {
          // if not, delete the memory entry
          delete Memory.creeps[name];
      }
  }

  // Tell the current creeps what to do - for each creeps
  for (let name in Game.creeps) {
    // run creep logic
     Game.creeps[name].runRole();
    }

  // Run tower commands - find all towers
  var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
  // for each tower
  for (let tower of towers) {
    // run tower logic
    tower.defend();
    }
    
    // for each spawn
    for (let spawnName in Game.spawns) {
        // run spawn logic
        Game.spawns[spawnName].spawnCreepsIfNecessary();
    }
};

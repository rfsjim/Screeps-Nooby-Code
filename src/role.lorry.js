module.exports = {
    // a function to run the logic for this role
    /** @param {Creep} creep */
    run: function(creep) {
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.store[RESOURCE_ENERGY] == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY)) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY)
            });

            if (structure == undefined) {
                structure = creep.room.storage;
            }

            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
        }
        // if creep is supposed to get energy
        else {
                let container;
                let containers = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: s=> s.resourceType == RESOURCE_ENERGY
                });
                if (containers != undefined) {
                    containers.sort(function(a,b) {return b.amount - a.amount});
                    container = containers[0];
                }

                if (container != undefined) {
                    if (creep.pickup(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                        console.log("Get Dropped Resources");
                    }
                } else {
                    container = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                        filter: s=> s.store[RESOURCE_ENERGY] > 0
                    });
                    console.log("Trying tombstone");
                }

                if (container == undefined) {
                    // find the container with most energy
                    containers = creep.room.find(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
                    });
                    containers.sort(function(a,b) {return b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]});
                    container = containers[0];
                    console.log("Trying containers");
                }

                if (container == undefined) {
                    container = creep.room.storage;
                    console.log("Trying storage");
                }

            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container);
                }
            }
        }
    }
};

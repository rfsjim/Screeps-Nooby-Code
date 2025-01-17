var roles = {
    harvester: require('./role.harvester'),
    upgrader: require('./role.upgrader'),
    builder: require('./role.builder'),
    repairer: require('./role.repairer'),
    wallRepairer: require('./role.wallRepairer'),
    longDistanceHarvester: require('./role.longDistanceHarvester'),
    claimer: require('./role.claimer'),
    miner: require('./role.miner'),
    lorry: require('./role.lorry'),
    roleExtractor: require('./role.extractor'),
    cleaner: require('./role.cleaner'),
    carlDouglas: require('./role.carlDouglas'),
    storageUpgrader: require('./role.storageUpgrader')
};

Creep.prototype.runRole =
    function () {
        roles[this.memory.role].run(this);
    };

Creep.prototype.getEnergy =
    function (useContainer, useSource) {
      let container;
      // if the Creep should look for containers
      if (useContainer) {
        // find closest container
        container = this.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
          s.store[RESOURCE_ENERGY] > 0
        });
        // if one was found
        if (container != undefined) {
          // try to withdraw energy, if the container is not in range
          if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            // move towards it
            this.moveTo(container);
          }
        }
      }
      // if no container was found and the Creep should look for Sources
      if (container == undefined && useSource) {
        // find closest source
        var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is in range
        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
          // move towards it
          this.moveTo(source);
        }
      }
    };

Creep.prototype.pickUpResource =
    function () {
        target = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (this.pickup(target) == ERR_NOT_IN_RANGE)
        {
            this.moveTo(target);
        }
    };

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
         if (creep.attack(target) == ERR_NOT_IN_RANGE) {
             creep.moveTo(target);
         }
        }
    }
};

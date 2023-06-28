const demageEventPublisher = require('../publishers/damage-event-publisher');


const damageEvent = (job) => {
    console.debug("damage-event-worker::["+job.variables.order_id+"]");
    switch(job.variables.operation_type){
        case 'solving-request':
            console.log("------------::solving-request");
            demageEventPublisher.damageEventReport(job.variables.order_id);
            break;
        default:
            console.error("------------::unknown-operation-type");
    }
    job.complete()
}

module.exports = { 
    damageEvent 
}
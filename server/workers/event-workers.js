const { zbc } = require('../zeebee-context');
const eventPublisher = require('../publishers/event-publisher');
const event = (job) => {
    console.debug("event-worker::["+job.variables.order_id+"]");
    eventPublisher.publishEvent(job.variables.key, job.variables.type);
    job.complete();
    console.debug("------------::job-completed");
}

module.exports = { 
    event
}
const landingPublisher = require('../publishers/landing-publisher');

const incident = (job) => {
    console.debug("indicent-worker::["+job.variables.order_id+"]order");
    switch(job.variables.operation_type){
        case 'notify-solver':
            console.log("------------::notify-solver");
            break;
        case 'request-landing':
            console.log("------------::request-landing");
            landingPublisher.landingRequest(job.variables.key);
            break;
        default:
            console.error("------------::unknown-operation-type");
    }
    job.complete()
}

module.exports = { 
    incident 
}
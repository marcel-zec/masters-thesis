const { zbc } = require('../zeebee-context')

const MSG_LANDING_REQUEST = 'msg-landing-request';
const MSG_LANDING_FINISHED = 'msg-landing-finished';
const MSG_LANDING_FINISHED_DAMAGE = 'msg-landing-finished-damage';
const MSG_LANDING_TERMINATED_DAMAGE = 'msg-landing-terminated-damage';

const landingRequest = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_LANDING_REQUEST,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("landing-publisher::["+orderId+"]landingRequest");
    return orderId;
};

const landingFinished = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_LANDING_FINISHED,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("landing-publisher::["+orderId+"]landingFinished");
    return orderId;
};

const landingFinishedDamageEvent = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_LANDING_FINISHED_DAMAGE,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("landing-publisher::["+orderId+"]landingFinishedDamageEvent");
    return orderId;
};

const landingTerminatedDamageEvent = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_LANDING_TERMINATED_DAMAGE,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("landing-publisher::["+orderId+"]landingTerminatedDamageEvent");
    return orderId;
};

module.exports = { 
    landingRequest,
    landingFinished,
    landingFinishedDamageEvent,
    landingTerminatedDamageEvent
}
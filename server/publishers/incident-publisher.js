const { zbc } = require('../zeebee-context')

const MSG_INCIDENT_REPORT = 'msg-incident-report';
const MSG_INCIDENT_SOLVED = 'msg-incident-solved';
const MSG_INCIDENT_SUNK = 'msg-incident-sunk';

const incidentReport = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_INCIDENT_REPORT,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("incident-publisher::["+orderId+"]incidentReport");
    return orderId;
};

const incidentSolved = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_INCIDENT_SOLVED,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("incident-publisher::["+orderId+"]incidentSolved");
    return orderId;
};

const incidentSunk = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_INCIDENT_SUNK,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("incident-publisher::["+orderId+"]incidentSunk");
    return orderId;
};

module.exports = { 
    incidentReport,
    incidentSolved,
    incidentSunk
}
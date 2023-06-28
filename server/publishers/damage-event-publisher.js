const { zbc } = require('../zeebee-context')

const MSG_DAMAGE_REPORT = 'msg-demage-event-report';
const MSG_DAMAGE_COMPLETED_PAID = 'msg-damage-event-paid';
const MSG_DAMAGE_COMPLETED_UNPAID = 'msg-damage-event-unpaid';

const damageEventReport = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_DAMAGE_REPORT,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("damage-event-publisher::["+orderId+"]damageEventReport");
    return orderId;
};

const damageEventCompletedPaid = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_DAMAGE_COMPLETED_PAID,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("damage-event-publisher::["+orderId+"]damageEventCompletedPaid");
    return orderId;
};

const damageEventCompletedUnpaid = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_DAMAGE_COMPLETED_UNPAID,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("damage-event-publisher::["+orderId+"]damageEventCompletedUnaid");
    return orderId;
};

module.exports = { 
    damageEventReport,
    damageEventCompletedPaid,
    damageEventCompletedUnpaid
}
const { zbc } = require('../zeebee-context')
const orderService = require('../services/order-service');

const MSG_BOARDING_REQUEST = 'msg-boarding-request';
const MSG_EARLY_TERMINATED = 'msg-boarding-early-terminated';
const MSG_EXPONENCIALLY_TERMINATED = 'msg-boarding-exceptionally-terminated';
const MSG_CUSTOMER_CONTROL_ENDED = 'msg-customer-control-ended';
const MSG_BOARDING_FAILED_CAPTAIN = 'msg-boarding-failed-captain';
const MSG_BOARDING_FINISHED = 'msg-boarding-finished';
const MSG_BOARDING_MOVE_DATE = 'msg-boarding-move-date';



const boardingRequest = (orderId) => {
    const order = orderService.getOrderFromDB(orderId);
    zbc.publishMessage({
	    name: MSG_BOARDING_REQUEST,
	    correlationKey: orderId,
        variables:{
            boardingRequest:{
                id: "BR"+ Date.now(),
                state:null,
                order: {...order.order}
            },
        }
    })
    console.log("boarding-publisher::["+orderId+"]boardingRequest");
    return orderId;
};

const boardingExponenciallyTerminated = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_EXPONENCIALLY_TERMINATED,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("boarding-publisher::["+orderId+"]boardingExponenciallyTerminated");
    return orderId;
};

const boardingEarlyTerminated = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_EARLY_TERMINATED,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("boarding-publisher::["+orderId+"]boardingEarlyTerminated");
    return orderId;
};

const boardingFailedCaptain = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_BOARDING_FAILED_CAPTAIN,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("boarding-publisher::["+orderId+"]boardingEarlyTerminated");
    return orderId;
};

const moveBoarding = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_BOARDING_MOVE_DATE,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("boarding-publisher::["+orderId+"]moveBoarding");
    return orderId;
};

const boardingCustomerControlEnded = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_CUSTOMER_CONTROL_ENDED,
	    correlationKey: orderId,
    })
    console.log("boarding-publisher::["+orderId+"]boardingCustomerControlEnded");
    return boardingRequestId;
};

const boardingFinish = (orderId) =>{
    zbc.publishMessage({
	    name: MSG_BOARDING_FINISHED,
	    correlationKey: orderId,
        variables:{
            order_id:orderId,
        }
    })
    console.log("boarding-publisher::["+orderId+"]boardingFinish");
    return orderId;
};



module.exports = { 
    boardingRequest,
    boardingEarlyTerminated,
    boardingExponenciallyTerminated,
    boardingCustomerControlEnded,
    boardingFailedCaptain,
    moveBoarding,
    boardingFinish
}
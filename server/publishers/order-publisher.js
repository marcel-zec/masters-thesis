const { zbc } = require('../zeebee-context')

const MSG_START = 'msg-start-event';
const MSG_ORDER_DEPOSIT_PAYMENT_COMPLETED = 'msg-order-deposit-payment-completed';
const MSG_ORDER_FULL_PAYMENT_COMPLETED = 'msg-order-full-payment-completed';

const normalTimestamps = {
    tree_days_timestamp: "P3D",
    four_days_timestamp: "P4D",
    thirty_minutes_timestamp: "P30M",
    ninety_days_timestamp: "P90D"
}

// timestamp used only for process simulation
const mockTimestamps = {
    tree_days_timestamp: "PT3S",
    four_days_timestamp: "PT4S",
    thirty_minutes_timestamp: "PT30S",
    ninety_days_timestamp: "PT90S"
}

const placeNewOrder = (props) =>{
    zbc.publishStartMessage({
	    name: MSG_START,
	    variables: props
    })
    console.log("order-publisher::["+props.order.id+"]placeNewOrder");
    return props.order.id;
};

const depositPaymentCompleted = (orderId) => {
    zbc.publishMessage({
        name: MSG_ORDER_DEPOSIT_PAYMENT_COMPLETED,
        correlationKey: orderId,
    })
    console.log("order-publisher::["+orderId+"]depositPaymentCompleted");
}

const fullPaymentCompleted = (orderId) => {
    zbc.publishMessage({
        name: MSG_ORDER_FULL_PAYMENT_COMPLETED,
        correlationKey: orderId,
    })
    console.log("order-publisher::["+orderId+"]fullPaymentCompleted");
}

module.exports = { 
    placeNewOrder,
    depositPaymentCompleted,
    fullPaymentCompleted
}
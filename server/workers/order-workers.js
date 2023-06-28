const orderService = require('../services/order-service');

const order = (job) => {
    console.debug("order-worker::["+job.variables.order_id+"]");
    switch(job.variables.operation_type){
        case 'cancel':
            console.log("------------::cancel");
            orderService.saveOrderToDB(job.variables.order);
            break;
        case 'completing':
            console.log("------------::completing");
            orderService.saveOrderToDB(job.variables.order);
            break;
        case 'delay-follow-orders':
            console.log("------------::delay-follow-orders");
            break;
        case 'finish':
            console.log("------------::finish");
            orderService.saveOrderToDB(job.variables.order);
            break;
        case 'terminate':
            console.log("------------::terminate");
            orderService.saveOrderToDB(job.variables.order);
            break;
        case 'save':
            console.log("------------::save");
            orderService.saveOrderToDB(job.variables.order);
            break;
        case "modify-binding-orders":
            console.log("------------::modify-binding-orders");
            break;
        default:
            console.error("------------::unknown-operation-type");
    }
    job.complete()
}

module.exports = { 
    order 
}
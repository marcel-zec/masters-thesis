const fs = require('fs');
const PATH = 'db/orders.txt';

const getOrderFromDB = (orderId) => {
    const data = fs.readFileSync(PATH);
    const orders = JSON.parse(data);
    const order = orders.filter((item)=>{
        return item.order.id == orderId;
    });
	if(order.length === 1){
        console.log("order-service::getOrderFromDB["+orderId+"]");
        return order[0];
    } else {
        console.error("Order with id:"+orderId+', not found.');
        throw Error();
    }
}

const saveOrderToDB = (order) => {
    const data = fs.readFileSync(PATH);
    const orders = JSON.parse(data);
    const newState = orders.filter((item) => {
        return item.order.id != order.id;
    });
    newState.push({order: order});
    fs.writeFileSync(PATH, JSON.stringify(newState));
    console.log("order-service::saveOrderToDB[" + order.id + "]");
}

module.exports = { 
    getOrderFromDB,
    saveOrderToDB
}
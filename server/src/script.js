
fetch('/orders').then((res)=>{
        return res.json();
    }).then((data)=>{
        const orders = JSON.parse(data.data)
        orders.forEach(item => {
            const order = item.order;
            const liNode = document.createElement("li");
            const text = "OrderID: " + order.id + " | State:  " + order.state +" | Customer name:  " + order.customer.name + " | Boat: " + order.boat.name;
            const textNode = document.createTextNode(text);
            liNode.appendChild(textNode);
            document.getElementById('orders').appendChild(liNode);
        });
}).catch((e)=>{
        console.error(e);
});
        
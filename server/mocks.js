const orderPublisher = require('./publishers/order-publisher');
const boardingPublisher = require('./publishers/boarding-publisher');
const incidentPublisher = require('./publishers/incident-publisher');
const landingPublisher = require('./publishers/landing-publisher');
const damageEventPublisher = require('./publishers/damage-event-publisher');
const fs = require('fs');

const TIMEOUT = 2500;

const mockOrder = () => {
    const id = Date.now().toString();
    const date = new Date();
    const startDate = new Date(2024,4,2);
    const endDate = new Date();
    const startPlusDays = 1 + Math.round(Math.random()*100);
    const endPlusDays = startPlusDays + 7 + Math.round(Math.random()*100);
    startDate.setDate(date.getDate()+startPlusDays);
    endDate.setDate(date.getDate()+endPlusDays);
    const order = {
        order:{
            id: id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            price: Math.floor(Math.random() * (3500 - 500 + 1)) + 500,
            state: null,
            customer:{
                name: (Math.random() + 1).toString(36).substring(7) + " " + (Math.random() + 1).toString(36).substring(5),
                email: "email"+ id + "@email.com",
                phoneNumber: Math.random().toString().slice(2,11),
                credibility: Math.floor(Math.random() * 101),
                state: null,
            },
            boat: {
                type: 'bavaria-38',
                name: 'Neptun ' + Math.floor(Math.random() * 10) + 1,
                dockNumber: (Math.random() + 1).toString(36).substring(8),
                capacity: Math.floor(Math.random() * 10) + 2,
                state: null,
            }
        }
    };

    const path = 'db/orders.txt';
	const jsonString = fs.readFileSync(path);
	const jsonObject = JSON.parse(jsonString);
	jsonObject.push(order);
	fs.writeFileSync(path, JSON.stringify(jsonObject), err => {
			if (err) {
				console.error(err);
			}
	});

    return order;
}

module.exports = {
    orderPlaced: () => {
        orderPublisher.placeNewOrder(mockOrder());
    },
    depositPaid: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
        }, TIMEOUT)
    },
    fullPricePaid: () =>{
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    boardingRequest: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    boardingEarlyTerminated: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingEarlyTerminated(orderId)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    boardingExponenciallyTerminated: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingExponenciallyTerminated(orderId)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    boardingFailedCaptain: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFailedCaptain(orderId)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    boardingFailedCaptainBoardingRequest: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFailedCaptain(orderId)
                        setTimeout(()=>{
                            boardingPublisher.boardingRequest(orderId)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    boardingFailedCaptainMoveBoarding: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFailedCaptain(orderId)
                        setTimeout(()=>{
                            boardingPublisher.moveBoarding(orderId)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    boardingFinished: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    incidentReportSolved: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            incidentPublisher.incidentReport(orderId)
                            setTimeout(()=>{
                                incidentPublisher.incidentSolved(orderId)
                            }, TIMEOUT)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    indicentReportSunk: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            incidentPublisher.incidentReport(orderId)
                            setTimeout(()=>{
                                incidentPublisher.incidentSunk(orderId)
                            }, TIMEOUT)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    incidentReportDelaySolved: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            incidentPublisher.incidentReport(orderId)
                            setTimeout(()=>{
                                incidentPublisher.incidentSolved(orderId)
                            }, (TIMEOUT * 3))
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    landingRequest: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            landingPublisher.landingRequest(orderId);
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    landingFinished: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            landingPublisher.landingRequest(orderId);
                            setTimeout(()=>{
                                landingPublisher.landingFinished(orderId);
                            }, TIMEOUT)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    landingFinishedDamage: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            landingPublisher.landingRequest(orderId);
                            setTimeout(()=>{
                                landingPublisher.landingFinishedDamageEvent(orderId);
                            }, TIMEOUT)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    landingTerminatedDamage: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            landingPublisher.landingRequest(orderId);
                            setTimeout(()=>{
                                landingPublisher.landingTerminatedDamageEvent(orderId);
                            }, TIMEOUT)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    damagePaid: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            landingPublisher.landingRequest(orderId);
                            setTimeout(()=>{
                                landingPublisher.landingFinishedDamageEvent(orderId);
                                setTimeout(()=>{
                                    damageEventPublisher.damageEventCompletedPaid(orderId);
                                }, TIMEOUT)
                            }, TIMEOUT)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
    damageUnpaid: () => {
        const orderId = orderPublisher.placeNewOrder(mockOrder());
        setTimeout(()=>{
            orderPublisher.depositPaymentCompleted(orderId)
            setTimeout(()=>{
                orderPublisher.fullPaymentCompleted(orderId)
                setTimeout(()=>{
                    boardingPublisher.boardingRequest(orderId)
                    setTimeout(()=>{
                        boardingPublisher.boardingFinish(orderId)
                        setTimeout(()=>{
                            landingPublisher.landingRequest(orderId);
                            setTimeout(()=>{
                                landingPublisher.landingFinishedDamageEvent(orderId);
                                setTimeout(()=>{
                                    damageEventPublisher.damageEventCompletedUnpaid(orderId);
                                }, TIMEOUT)
                            }, TIMEOUT)
                        }, TIMEOUT)
                    }, TIMEOUT)
                }, TIMEOUT)
            }, TIMEOUT)
        }, TIMEOUT)
    },
}

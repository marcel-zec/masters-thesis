
const { zbc } = require('./zeebee-context')
const emailWorkers = require('./workers/email-workers');
const eventWorkers = require('./workers/event-workers');
const orderWorkers = require('./workers/order-workers');
const indicentWorkers = require('./workers/incident-workers');
const damageEventWorkers = require('./workers/damage-event-workers');
const timestampWorkers = require('./workers/timestamp-workers');
const printWorkers = require('./workers/print-workers');
const orderPublisher = require('./publishers/order-publisher');
const boardingPublisher = require('./publishers/boarding-publisher');
const landingPublisher = require('./publishers/landing-publisher');
const incidentPublisher = require('./publishers/incident-publisher');
const eventPublisher = require('./publishers/event-publisher');


const orderService = require('./services/order-service');
const mocks = require('./mocks');

/**
 *  WORKERS
 *  */ 

/** Email worker
 * @type 'email'  
 * @input email_type -- name of service 
 * @input email_adress -- reciever email address
*/
zbc.createWorker({
	taskType: 'email',
	taskHandler: emailWorkers.email,
});

/** Order worker
 * @type 'order'  
 * @input operation_type -- name of service 
*/
zbc.createWorker({
	taskType: 'order',
	taskHandler: orderWorkers.order,
});

/** Incident worker
 * @type 'incident'  
 * @input operation_type -- name of service 
*/
zbc.createWorker({
	taskType: 'incident',
	taskHandler: indicentWorkers.incident,
});

/** Damage event worker
 * @type 'damage_event'  
 * @input operation_type -- name of service 
*/
zbc.createWorker({
	taskType: 'damage_event',
	taskHandler: damageEventWorkers.damageEvent,
});

/** Timestamp worker
 * @type 'timestamp'  
 * @input operation_type -- name of service 
*/
zbc.createWorker({
	taskType: 'timestamp',
	taskHandler: timestampWorkers.timestamp,
});

zbc.createWorker({
	taskType: 'print',
	taskHandler: printWorkers.print,
});

/** Event worker
 * @type 'event'  
 * @input type -- message name
 * @input key -- correlation key
*/
zbc.createWorker({
	taskType: 'event',
	taskHandler: eventWorkers.event,
});

/** HTTP Server */
const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Application started and listening on port 3000");
});

const filePath = (name) =>{
    return __dirname + "/src/"+name+".html";
}

/** Router */
app.get("/", (req, res) => {
  res.sendFile(filePath("index"));
});

app.get("/orders", (req, res) => {
	fs.readFile('db/orders.txt', 'utf8', (err, data) => {
		if (err) {
		  console.error(err);
		}
		res.json({data:data});
	});
});

app.get("/refresh-database", (req, res) => {
	fs.writeFile('db/orders.txt','[]',err => {
		if (err) {
			console.error(err);
		}
	});
	res.redirect("/");
});

app.get("/customer/create-order", (req, res) => {
	res.sendFile(filePath("orderCreate"));
});

app.post("/customer/create-order", (req, res) => {
	const order = {
		order:{
            id: Date.now(),
            startDate: req.body.start_date,
            endDate: req.body.end_date,
            state: null,
			price: Math.floor(Math.random() * (3500 - 500 + 1)) + 500,
			customer:{
				name: req.body.name,
				email: req.body.email,
				phoneNumber: req.body.phone,
				credibility: req.body.credibility,
				state: null,
			},
			boat: {
				name: req.body.boatName,
				type: req.body.boat,
				capacity: req.body.capacity,
				dockNumber: (Math.random() + 1).toString(36).substring(8),
				state: null,
			}
        }
	}
	
	// Write data to file
	orderService.saveOrderToDB(order.order);
	orderPublisher.placeNewOrder(order);
	res.redirect("/");
});

app.get("/customer/pay-order", (req, res) => {
	res.sendFile(filePath("orderPay"));
});

app.post("/customer/pay-order", (req, res) => {
	console.log("Index::POST[/customer/pay-order]");
	orderPublisher.fullPaymentCompleted(req.body.order_number);
	res.redirect("/");
});

app.get("/customer/pay-deposit", (req, res) => {
	res.sendFile(filePath("depositPay"));
});

app.post("/customer/pay-deposit", (req, res) => {
	console.log("Index::POST[/customer/pay-deposit]");
	orderPublisher.depositPaymentCompleted(req.body.order_number);
	res.redirect("/");
});

app.get("/employee/boarding-request", (req, res) => {
	res.sendFile(filePath("boardingRequest"));
});

app.post("/employee/boarding-request", (req, res) => {
	console.log("Index::POST[/employee/boarding-request]");
	boardingPublisher.boardingRequest(req.body.order_number);
	res.redirect("/");
});

app.get("/employee/landing-request", (req, res) => {
	res.sendFile(filePath("landingRequest"));
});

app.post("/employee/landing-request", (req, res) => {
	console.log("Index::POST[/employee/landing-request]");
	landingPublisher.landingRequest(req.body.order_number);
	res.redirect("/");
});

app.get("/employee/report-incident", (req, res) => {
	res.sendFile(filePath("incidentReport"));
});

app.post("/employee/report-incident", (req, res) => {
	console.log("Index::POST[/employee/report-incident]");
	incidentPublisher.incidentReport(req.body.order_number);
	res.redirect("/");
});


/**
 * Routes for public shared files
 */
app.get("/script.js", (req, res) => {
	res.sendFile(__dirname + "/src/script.js");
});
app.get("/customer/script.js", (req, res) => {
	res.sendFile(__dirname + "/src/script.js");
});
app.get("/employee/script.js", (req, res) => {
	res.sendFile(__dirname + "/src/script.js");
});


/**
 * Simulation routes
 */
app.post("/event", (req, res) => {
	console.log("Index::POST[/event]");
	const correlationKey = req.body.correlation;
	const event = req.body.event;
	eventPublisher.publishEvent(correlationKey, event);
	res.redirect("/");
});

app.get('/simulation/:simulationNumber', function(req, res) {
	switch(req.params.simulationNumber){
		case '1': mocks.orderPlaced(); break;
		case '2': mocks.depositPaid(); break;
		case '3': mocks.fullPricePaid(); break;
		case '4': mocks.boardingRequest(); break;
		case '5': mocks.boardingFinished(); break;
		case '6': mocks.boardingEarlyTerminated(); break;
		case '7': mocks.boardingExponenciallyTerminated(); break;
		case '8': mocks.boardingFailedCaptain() ;break;
		case '9': mocks.boardingFailedCaptainBoardingRequest(); break;
		case '10': mocks.boardingFailedCaptainMoveBoarding(); break;
		case '11': mocks.incidentReportSolved(); break;
		case '12': mocks.indicentReportSunk(); break;
		case '13': mocks.incidentReportDelaySolved(); break;
		case '14': mocks.landingRequest(); break;
		case '15': mocks.landingFinished(); break;
		case '16': mocks.landingFinishedDamage(); break;
		case '17': mocks.damagePaid(); break;
		case '18': mocks.damageUnpaid(); break;
		case '19': mocks.landingTerminatedDamage();break;
		default:
			console.error("Simulation with number "+req.params.simulationNumber+" not exists");
			break;
	}
	res.redirect("/");
  });



  
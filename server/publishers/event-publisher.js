const { zbc } = require('../zeebee-context')

const publishEvent = (correlationKey, messageName, variables = null) => {
    zbc.publishMessage({
	    name: messageName,
	    correlationKey: correlationKey,
        variables:variables,
    })
    console.log("event-publisher::"+messageName+"["+correlationKey+"]");
    return correlationKey;
};

module.exports = { 
    publishEvent
}
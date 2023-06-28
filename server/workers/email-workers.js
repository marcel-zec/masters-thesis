const TEMPLATES = require('../config/emails/templates.json');

const email = (job) => {
    console.debug("email-worker::["+job.variables.order_id+"]");
    if (TEMPLATES.hasOwnProperty(job.variables.email_type)){
        console.debug("------------::email["+job.variables.email_address+"]");
        console.debug("\n\n");
        console.log(TEMPLATES[job.variables.email_type].text,...job.variables.email_variables);
        console.debug("\n\n----------------------------------------");
    } else {
        console.error("------------::unknown-email-template");
    }
    
    job.complete();
}

module.exports = { 
    email
}
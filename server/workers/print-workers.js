const print = (job) => {
    console.debug("print-worker::"+job.variables.type+"["+job.variables.key+"]");
    job.complete();
}

module.exports = { 
    print
}
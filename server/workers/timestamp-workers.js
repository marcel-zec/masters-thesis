const timestampService = require('../services/timestamp-service');

const timestamp = (job) => {
  const outputs = {};
  console.debug("timestamp-worker::["+job.variables.order_id+"]");
  switch(job.variables.operation_type){
      case "payment-reminder":
          console.log("------------::payment-reminder");
          timestampService.paymentReminder(job, outputs);
          break;
        case "payment-cancel":
          console.log("------------::payment-cancel");
          timestampService.paymentCancel(job, outputs);
          break;
        case "boarding":
          console.log("------------::boarding");
          timestampService.countDurationFromDate(job, outputs);
          break;
        case "landing":
          console.log("------------::landing");
          timestampService.countDurationFromDate(job, outputs);
          break;
        case "reschedule-days":
          console.log("------------::reschedule-days");
          try {
            timestampService.rescheduleDays(job, outputs);
          } catch (e){
            console.error("ERROR::timestamp-worker::[" + e + "]");
            job.error(e);
            return;
          }
          break;
          case "reschedule-boarding-date":
            console.log("------------::reschedule-boarding-date");
            try {
              timestampService.boardingRescheduleDate(job, outputs);
            } catch (e){
              console.error("ERROR::timestamp-worker::[" + e + "]");
              job.error(e);
              return;
            }
            break;
          case "end-time":
            console.log("------------::end-time");
            timestampService.durationEndTime(job, outputs);
            break;
            
      default:
          console.error("------------::unknown-operation");
  }
  console.debug("------------::job-completed");
  job.complete({
    ...outputs
  });
}

module.exports = { 
  timestamp 
}
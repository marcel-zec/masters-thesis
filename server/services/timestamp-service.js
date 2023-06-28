const getDurationBetweenDates = (startDate, endDate) => {
    const MS_IN_SEC = 1000;
    const SEC_IN_MIN = 60;
    const MIN_IN_HOUR = 60;
    const HOUR_IN_DAY = 24;
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    if (start > end) {
        console.error("timestamp-worker::getDuration --- Start date must be before end date! [" + start + "," + end + "]");

        console.error("Start date must be before end date!");
        return '';
    }
  
    // Calculate the time difference between the two dates in milliseconds
    let timeDiff = Math.abs(end.getTime() - start.getTime());
  
    // Calculate the number of years
    const years = Math.floor(timeDiff / (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY * 365));
    timeDiff -= years * MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY * 365;
  
    // Calculate the number of months
    let months = 0;
    while (timeDiff >= MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY * 28) {
      const tempDate = new Date(start);
      tempDate.setMonth(start.getMonth() + months + 1);
      const daysInMonth = (new Date(tempDate.getFullYear(), tempDate.getMonth(), 0)).getDate();
      timeDiff -= MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY * daysInMonth;
      months++;
    }
  
    // Calculate the number of days
    const days = Math.floor(timeDiff / (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY));
    timeDiff -= days * MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY;
  
    // Calculate the number of hours
    const hours = Math.floor(timeDiff / (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR));
    timeDiff -= hours * MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
  
    // Calculate the number of minutes
    const minutes = Math.floor(timeDiff / (MS_IN_SEC * SEC_IN_MIN));
    timeDiff -= minutes * MS_IN_SEC * SEC_IN_MIN;
  
    // Calculate the number of seconds
    const seconds = Math.floor(timeDiff / MS_IN_SEC);
  
    // Construct the duration string
    let duration = "P";
    if (years > 0) {
      duration += years + "Y";
    }
    if (months > 0) {
      duration += months + "M";
    }
    if (days > 0) {
      duration += days + "D";
    }
    if (hours > 0 || minutes > 0 || seconds > 0) {
      duration += "T";
      if (hours > 0) {
        duration += hours + "H";
      }
      if (minutes > 0) {
        duration += minutes + "M";
      }
      if (seconds > 0) {
        if (hours === 0 && minutes === 0) {
          duration += "T";
        }
        duration += seconds + "S";
      }
    }

    return duration;
};

const getNumberOfDaysBetween = (date1, date2) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(timeDifference / oneDay);
}

const addDaysToDate = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const getDurationForDaysDifference = (date1, date2, dayLimit) => {
  let days = getNumberOfDaysBetween(date1, date2);
  if(days > dayLimit){
    days -= dayLimit;
    // Create days duration
    return "P"+days+"D";
   } else {
    // Create 1 second duration when difference smaller than limit
    return "PT1S";
  }
}

const durationBetweenNowAndGivenHour = (givenHours, givenMinutes = 0, todayDate = new Date()) =>{
  const MS_IN_SEC = 1000;
  const SEC_IN_MIN = 60;
  const MIN_IN_HOUR = 60;

  // Set given time
  const givenTime = new Date(todayDate);  // todayDate is default new Date() but it can be changes for test purpose
  givenTime.setHours(givenHours);       
  if(givenMinutes > 0){
    givenTime.setMinutes(givenMinutes);     
  }

  // Calculate the time difference and convert to hours and minutes
  const timeDiff = givenTime.getTime() - todayDate.getTime();
  if(timeDiff < 0){
    return "PT1S"; // Duration one second when actual time already pass given time
  }
  const hours = Math.floor(timeDiff / (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR));
  const minutes = Math.floor((timeDiff % (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR)) / (MS_IN_SEC * MIN_IN_HOUR));
  // Set duration timestamp
  let duration = "PT";
  if(hours > 0){
    duration += (hours + "H")
  }
  if(minutes > 0){
    duration += (minutes + "M")
  } else {
    duration += "1M"
  }
  return duration;
}

/**
 * Payment reminder
 * @input operation_type = "payment-reminder"
 * @input cruise_date -- date of cruise
 * @input remind_days -- number of days before cruise for remind
 * @output full_reminder -- duration in ISO8601
 */
const paymentReminder = (job, outputs) =>{
  const date1 = new Date(Date.now());
  const date2 = new Date(Date.parse(job.variables.cruise_date));
  const timestamp = getDurationForDaysDifference(date1, date2, job.variables.remind_day); // Month and one week before cruise
  outputs.full_reminder = timestamp;
}

const paymentCancel = (job, outputs) =>{
  const date1 = new Date(Date.now());
  const date2 = new Date(Date.parse(job.variables.cruise_date));
  const timestamp = getDurationForDaysDifference(date1, date2, 30); // Month before cruise
  outputs.full_cancel = timestamp;
}

const countDurationFromDate = (job, outputs) =>{
  const date1 = new Date(Date.now());
  const date2 = new Date(Date.parse(job.variables.date));
  
  // Set hours to zero to get start of the day
  date1.setHours(0,0,0);
  // Set hours to boarding end hour
  date2.setHours(job.variables.end_hours,0,1); 

  const timestamp = getDurationBetweenDates(date1, date2);
  outputs.date = date2.toDateString();
  outputs.end_time = timestamp;
}

/** Reschedule days
 * type = "reschedule-days"
 * input (optional) = max_days
 * input = reschedule_days -- number of days to reschedule
 * input = end_hours -- end of time at rescheduled day
 * input = original_date -- original date
 * input = date -- actual date (could be rescheduled already)
 * output = date
 * output = end_time -- duration to rescheduled date in ISO8601
 * throw = 4002 -- when reschedule_days is more than max_days 
 *        or difference between original_date and new date is more than max_days  
 */
const rescheduleDays = (job, outputs) =>{
  if(job.variables.max_days){
    if(job.variables.reschedule_days > job.variables.max_days){
      throw "4002";
    }
  }
  const date1 = new Date(Date.now());
  const date2 = addDaysToDate(new Date(Date.parse(job.variables.date)), job.variables.reschedule_days);

  if(job.variables.max_days){
    const diffDays = getNumberOfDaysBetween(new Date(job.variables.original_date), date2);
    if(diffDays >= job.variables.max_days){
      throw "4002";
    }
  }
  
  // Set hours to zero to get start of the day
  date1.setHours(0,0,0);
  // Set hours to boarding end hour
  date2.setHours(job.variables.end_hours,0,1); 

  const timestamp = getDurationBetweenDates(date1, date2);
  outputs.date = date2.toDateString();
  outputs.end_time = timestamp;
}

const boardingRescheduleDate = (job, outputs) =>{

  const date1 = new Date(Date.now());
  const date2 = new Date(Date.parse(job.variables.date));

  if(job.variables.max_days){
    const diffDays = getNumberOfDaysBetween(new Date(job.variables.original_date), date2);
    if(diffDays >= job.variables.max_days){
      throw "4001";
    }
  }
  
  // Set hours to zero to get start of the day
  date1.setHours(0,0,0);
  // Set hours to boarding end hour
  date2.setHours(job.variables.end_hours,0,1); 

  const timestamp = getDurationBetweenDates(date1, date2);
  outputs.date = date2.toDateString();
  outputs.end_time = timestamp;
}

const durationEndTime = (job, outputs) =>{
  outputs.end_time = durationBetweenNowAndGivenHour(job.variables.end_hours,job.variables.end_minutes);
}

module.exports = { 
  paymentReminder,
  paymentCancel,
  countDurationFromDate,
  boardingRescheduleDate,
  rescheduleDays,
  durationEndTime,
  durationBetweenNowAndGivenHour,
  getDurationBetweenDates,
  getDurationForDaysDifference,
  getNumberOfDaysBetween,
  addDaysToDate 
}
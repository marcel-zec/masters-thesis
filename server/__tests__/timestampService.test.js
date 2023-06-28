const { 
  getDurationBetweenDates,
  getNumberOfDaysBetween,
  addDaysToDate,
  getDurationForDaysDifference,
  countDurationFromDate,
  boardingRescheduleDays,
  durationBetweenNowAndGivenHour
} = require('../services/timestamp-service');

test('getDurationBetweenDates::difference between two dates in the same day is PT1H30M', () => {
    const date1 = new Date(2022, 0, 1, 5, 0);
    const date2 = new Date(2022, 0, 1, 6, 30);
    const expected = 'PT1H30M';
    const actual = getDurationBetweenDates(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });
  
test('getDurationBetweenDates::difference between two dates in the same month is PT3D', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 4);
    const expected = 'P3D';
    const actual = getDurationBetweenDates(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });
  
test('getDurationBetweenDates::difference between two dates in different months is P1M3D', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 1, 4);
    const expected = 'P1M3D';
    const actual = getDurationBetweenDates(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });
  
test('getDurationBetweenDates::difference between two dates in different years is P1Y1M1D', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2023, 1, 2);
    const expected = 'P1Y1M1D';
    const actual = getDurationBetweenDates(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });
  
test('getDurationBetweenDates::difference between two times on the same day is PT1H30M', () => {
    const date1 = new Date(2022, 0, 1, 10, 0, 0);
    const date2 = new Date(2022, 0, 1, 11, 30, 0);
    const expected = 'PT1H30M';
    const actual = getDurationBetweenDates(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });
  
test('getDurationBetweenDates::difference between two times in different days is PT2H30M', () => {
    const date1 = new Date(2022, 0, 1, 23, 0, 0);
    const date2 = new Date(2022, 0, 2, 1, 30, 0);
    const expected = 'PT2H30M';
    const actual = getDurationBetweenDates(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

test('getNumberOfDaysBetween::number of days between dates 1.1.2022 and 1.1.2022 is 0', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 1);
    const expected = 0;
    const actual = getNumberOfDaysBetween(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });


test('getNumberOfDaysBetween::number of days between dates 1.1.2022 and 2.1.2022 is 2', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 2);
    const expected = 1;
    const actual = getNumberOfDaysBetween(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

test('getNumberOfDaysBetween::number of days between dates 1.1.2022 and 9.1.2022 is 8', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 9);
    const expected = 8;
    const actual = getNumberOfDaysBetween(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

test('getNumberOfDaysBetween::number of days between dates 1.1.2022 and 9.1.2022 is 31', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 1, 1);
    const expected = 31;
    const actual = getNumberOfDaysBetween(date1, date2);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

test('addDaysToDate::date 1.1.2022 after added 1 day is 2.1.2022', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 2);
    const resultDate = addDaysToDate(date1, 1);
    expect(resultDate <= date2 && resultDate >= date2).toBe(true);
  });

test('addDaysToDate::date 1.1.2022 after added 6 days is 7.1.2022', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 7);
    const resultDate = addDaysToDate(date1, 6);
    expect(resultDate <= date2 && resultDate >= date2).toBe(true);
  });
  
test('addDaysToDate::date 1.1.2022 after added 31 days is 1.2.2022', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 1, 1);
    const resultDate = addDaysToDate(date1, 31);
    expect(resultDate <= date2 && resultDate >= date2).toBe(true);
  });

test('addDaysToDate::date 1.1.2022 after added 0 days is 1.1.2022', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 1);
    const resultDate = addDaysToDate(date1, 0);
    expect(resultDate <= date2 && resultDate >= date2).toBe(true);
  });

test('addDaysToDate::date 31.12.2022 after added 1 day is 1.1.2023', () => {
    const date1 = new Date(2022, 11, 31);
    const date2 = new Date(2023, 0, 1);
    const resultDate = addDaysToDate(date1, 1);
    expect(resultDate <= date2 && resultDate >= date2).toBe(true);
  });

test('getDurationForDaysDifference::duration for 30 days difference from 1.1.2022 to 1.1.2022 is PT1S', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 1);
    const expected = "PT1S";
    const actual = getDurationForDaysDifference(date1, date2, 30);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

test('getDurationForDaysDifference::duration for 30 days difference from 1.1.2022 to 31.1.2022 is PT1S', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 0, 31);
    const expected = "PT1S";
    const actual = getDurationForDaysDifference(date1, date2, 30);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

test('getDurationForDaysDifference::duration for 30 days difference from 1.1.2022 to 1.2.2022 is P1D', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 1, 1);
    const expected = "P1D";
    const actual = getDurationForDaysDifference(date1, date2, 30);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

test('getDurationForDaysDifference::duration for 30 days difference from 1.1.2022 to 5.2.2022 is P5D', () => {
    const date1 = new Date(2022, 0, 1);
    const date2 = new Date(2022, 1, 5);
    const expected = "P5D";
    const actual = getDurationForDaysDifference(date1, date2, 30);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

test('countDurationFromDate::duration for check-in today at 16:00 is PT16H', () => {
    const expected = "PT16H";
    const job = {
      variables:{
        date: new Date(),
        end_hours: 16
      }
    }
    const outputs = {};
    countDurationFromDate(job, outputs);
    const actual = outputs.end_time;
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

  test('boardingRescheduleDays::duration for one day rescheduled check-in at 16:00 is P1DT16H', () => {
    const expected = "P1DT16H";
    const job = {
      variables:{
        boarding_date: new Date(),
        boarding_end_hours: 16,
        reschedule_days: 1,
      }
    }
    const outputs = {};
    boardingRescheduleDays(job, outputs);
    const actual = outputs.timestamp_boarding_end;
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

  test('durationBetweenNowAndGivenHour::duration between 1.1.2022 15:00 and end time 16 hours and 30 minuts is PT1H30M', () => {
    const date = new Date(2022, 0, 1);
    date.setHours(15);
    const expected = "PT1H30M";
    const actual = durationBetweenNowAndGivenHour(16, 30, date);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

  test('durationBetweenNowAndGivenHour::duration between 1.1.2022 15:00 and end time 15 hours is PT1M', () => {
    const date = new Date(2022, 0, 1);
    date.setHours(15)
    const expected = "PT1M";
    const actual = durationBetweenNowAndGivenHour(15,0,date);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });

  test('durationBetweenNowAndGivenHour::duration between 1.1.2022 15:00 and end time 16 hours is PT1S', () => {
    const date = new Date(2022, 0, 1);
    date.setHours(16)
    const expected = "PT1S";
    const actual = durationBetweenNowAndGivenHour(15,0,date);
    expect(actual).toBe(expected, `Expected ${expected} but got ${actual}`);
  });


  


  
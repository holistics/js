import dayjs from 'dayjs';

/**
 * Offseting the time of a JavaScript date object.
 * The final result is a JS date object whose value is offset from UTC to the "timezone" parameter.
 *
 * Step 1: Because JS date object is always in UTC, this conversion first create a dayjs instance base on the input date
 *
 * Step 2: Conversion in DayJS means changing both the value and the timezone, in other words, the converted dayjs value
 * and the original date still indicate the same absolute value
 *
 * Step 3: Change the timezone of the converted dayjs instance in step 2 into UTC.
 * Note that this doesn't change the value, only the timezone is changed
 *
 * @param {Date} date
 * @param {String} timezone
 */
export default (date, timezone) => {
  return dayjs(date).tz(timezone).utc(true).toDate();
};

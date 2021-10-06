import { DateTime } from 'luxon';

/**
 * Offseting the time of a JavaScript date object.
 * The final result is a JS date object whose value is offset from UTC to the target timezone
 * Note that JSDate is always UTC
 *
 * Step 1: Create a Luxon date from JSDate
 *
 * Step 2: Convert from UTC to target timezone. This is done by passing the "timezone" option in fromJSDate()
 *
 * Step 3: Change the zone to UTC without altering the time value, note the "keepLocalTime"
 * https://moment.github.io/luxon/#/zones?id=keeplocaltime
 *
 * @param {Date} date
 * @param {String} timezone
 * @returns {Date} a JS date
 */
export default (date, timezone) => {
  return DateTime.fromJSDate(date, { zone: timezone }).setZone('Etc/UTC', { keepLocalTime: true }).toJSDate();
};

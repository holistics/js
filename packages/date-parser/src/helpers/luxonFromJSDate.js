import { DateTime } from 'luxon';

/**
 * Build a luxon instance from a JS date.
 * Because JS date is always stored in UTC, hence, the timezone of the luxon instance is also UTC
 */
export default (jsDate) => {
  return DateTime.fromJSDate(jsDate, { zone: 'Etc/UTC' });
};

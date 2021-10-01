/**
 *
 * @param {Date} date
 * @param {String | null} timezone timezone region
 */
export default (date, timezone = null) => {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    timezone,
  };
};

/**
 *
 * @param {Luxon.DateTime} luxon instance
 * @param {String} timezone timezone region
 */
export default (luxon, timezone = null) => {
  return {
    year: luxon.year,
    month: luxon.month, // luxon's month starts at 1, same as our date struct
    day: luxon.day,
    hour: luxon.hour,
    minute: luxon.minute,
    second: luxon.second,
    timezone,
  };
};

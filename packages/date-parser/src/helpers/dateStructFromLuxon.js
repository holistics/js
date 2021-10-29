/**
 *
 * @param {Luxon.DateTime} luxon instance
 */
export default (luxon) => {
  return {
    year: luxon.year,
    month: luxon.month, // luxon's month starts at 1, same as our date struct
    day: luxon.day,
    hour: luxon.hour,
    minute: luxon.minute,
    second: luxon.second,
    millisecond: luxon.millisecond,
    timezone: luxon.zoneName,
    // Because this struct is passed as a Chrono result, some internal Chrono logic depends
    // on timezoneOffset for calculation, so we set it to be 0 to avoid breaking those logic.
    //
    // This won't affect the final result because our v3 logic will process tz region and skip this offset
    //
    timezoneOffset: 0,
  };
};

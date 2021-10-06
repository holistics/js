import convertTimezone from './convertTimezone';
import luxonFromStruct from './luxonFromStruct';
import { DATE_UNIT_LEVELS } from '../constants';
import dateStructFromLuxon from './dateStructFromLuxon';

const shouldUseUTC = (dateUnit) => {
  return DATE_UNIT_LEVELS[dateUnit] >= DATE_UNIT_LEVELS.hour;
};

/**
 *
 * @param {Date} ref
 * @param {DATE_UNIT_LEVELS} dateUnit
 * @param {string} timezone
 * @returns {Date}
 */
const adjustRefdate = (ref, dateUnit, timezone) => {
  if (!timezone) { return ref; }

  // If the computed unit > hour, then we don't care about DST, we can adjust the clock from UTC to wallclock BEFORE CALCULATION
  //
  // Otherwise, we should stay with UTC because calculating in wallclock when DST happens is way to complex.
  // AFTER CALCULATION we offset the UTC -> wallclock again
  //
  // In short:
  //           unit >  hour: Adjust the ref   -> calculate
  //           unit <= hour: calculate        -> Adjust the result
  //
  // Related reading: https://moment.github.io/luxon/index.html#/math?id=calendar-math-vs-time-math
  //
  return shouldUseUTC(dateUnit) ? ref : convertTimezone(ref, timezone);
};


/**
 * Convert result from UTC to target timezone
 * @param {DateStruct} dateStruct
 */
const convertResultFromUtc = (dateStruct, timezone) => {
  const luxonInstance = luxonFromStruct(dateStruct, 'Etc/UTC');
  const converted = luxonInstance.setZone(timezone);
  return dateStructFromLuxon(converted);
};

export { shouldUseUTC, adjustRefdate, convertResultFromUtc };

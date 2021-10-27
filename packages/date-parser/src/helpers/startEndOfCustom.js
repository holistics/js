import { lowerCase } from 'lodash';
import { WEEKDAYS_MAP } from '../constants';

/**
 *
 * @param {Luxon.DateTime} currentDate
 * @param {WEEKDAYS_MAP} wsdIdx
 * @returns number
 */
const shiftRange = (currentDate, wsdIdx) => {
  const currentWeekday = WEEKDAYS_MAP[lowerCase(currentDate.weekdayLong)];
  return (currentWeekday - wsdIdx + 7) % 7;
};

// The DateTime.startOf, DateTime.endOf function of luxon doesn't support week start day other than Monday
// Here we add extra logic to support custom week start day

/**
 *
 * @param {Luxon.DateTime} luxon
 * @param {String} dateUnit
 * @param {WEEKDAYS_MAP} weekStarDayIdx
 * @returns Luxon.DateTime
 */
const startOfCustom = (luxon, dateUnit, weekStarDayIdx = WEEKDAYS_MAP.Monday) => {
  if (dateUnit !== 'week' || weekStarDayIdx === WEEKDAYS_MAP.Monday) { return luxon.startOf(dateUnit); }

  return luxon
    .minus({ days: shiftRange(luxon, weekStarDayIdx) }) // shift to the start of week
    .startOf('day'); // truncate the day, this follows the behavior of the original DateTime.startOf
};

/**
 *
 * @param {Luxon.DateTime} luxon
 * @param {String} dateUnit
 * @param {WEEKDAYS_MAP} weekStarDayIdx
 * @returns Luxon.DateTime
 */
const endOfCustom = (luxon, dateUnit, weekStarDayIdx = WEEKDAYS_MAP.Monday) => {
  if (dateUnit !== 'week' || weekStarDayIdx === WEEKDAYS_MAP.Monday) { return luxon.endOf(dateUnit); }

  const startOfWeek = luxon.minus({ days: shiftRange(luxon, weekStarDayIdx) });

  return startOfWeek
    .plus({ days: 6 }) // shift to the end of week
    .endOf('day'); // truncate the day to end of day, this follows the behavior of the original DateTime.endOf
};

export { startOfCustom, endOfCustom };

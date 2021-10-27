import { WEEKDAYS } from '../constants';

const shiftRange = (currentDate, wsd) => {
  // luxon Sunday = 7, while our WEEKDAYS.Sunday = 0
  // other days are the same
  const currentWeekday = currentDate.weekday === 7 ? 0 : currentDate.weekday;
  return (currentWeekday - wsd + 7) % 7;
};

// The DateTime.startOf, DateTime.endOf function of luxon doesn't support week start day other than Monday
// Here we add extra logic to support custom week start day

/**
 *
 * @param {Luxon.DateTime} luxon
 * @param {String} dateUnit
 * @param {WEEKDAYS} weekStarDay
 * @returns Luxon.DateTime
 */
const startOfCustom = (luxon, dateUnit, weekStarDay = WEEKDAYS.Monday) => {
  if (dateUnit !== 'week' || weekStarDay === WEEKDAYS.Monday) { return luxon.startOf(dateUnit); }

  return luxon
    .minus({ days: shiftRange(luxon, weekStarDay) }) // shift to the start of week
    .startOf('day'); // truncate the day, this follows the behavior of the original DateTime.startOf
};

/**
 *
 * @param {Luxon.DateTime} luxon
 * @param {String} dateUnit
 * @param {WEEKDAYS} weekStarDay
 * @returns Luxon.DateTime
 */
const endOfCustom = (luxon, dateUnit, weekStarDay = WEEKDAYS.Monday) => {
  if (dateUnit !== 'week' || weekStarDay === WEEKDAYS.Monday) { return luxon.endOf(dateUnit); }

  const startOfWeek = luxon.minus({ days: shiftRange(luxon, weekStarDay) });

  return startOfWeek
    .plus({ days: 6 }) // shift to the end of week
    .endOf('day'); // truncate the day to end of day, this follows the behavior of the original DateTime.endOf
};


export { startOfCustom, endOfCustom };

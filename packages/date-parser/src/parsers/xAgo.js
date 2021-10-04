import Chrono from 'chrono-node';
import dateStructFromDate from '../helpers/dateStructFromDate';
import truncateDateStruct from '../helpers/truncateDateStruct';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import { DATE_UNIT_LEVELS } from '../constants';
import convertTimezone from '../helpers/convertTimezone';
import luxonFromStruct from '../helpers/luxonFromStruct';
import dateStructFromLuxon from '../helpers/dateStructFromLuxon';

const parser = new Chrono.Parser();

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
  return dateStructFromLuxon(converted, timezone);
};

parser.pattern = () => {
  /* eslint-disable-next-line max-len */
  return new RegExp('(exact(?:ly)? )?(\\d+) (year|month|week|day|hour|minute|second)s? (ago|from now)( for \\d+ (?:year|month|week|day|hour|minute|second)s?)?', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match, opt) => {
  const exact = !!match[1];
  const dateUnit = match[3].toLowerCase();
  const isPast = match[4].toLowerCase() !== 'from now';
  const value = parseInt(match[2]) * (isPast ? -1 : 1);
  const duration = match[5];

  const { timezone } = opt;
  const adjustedRef = adjustRefdate(ref, dateUnit, timezone);

  let refDateStruct = dateStructFromDate(adjustedRef);
  if (!exact) {
    refDateStruct = truncateDateStruct(refDateStruct, dateUnit);
  }
  let startMoment = momentFromStruct(refDateStruct, { weekStartDay: opt.weekStartDay });
  startMoment = startMoment.add(value, dateUnit);

  let endMoment = startMoment.clone();
  if (duration) {
    const [durationValue, durationDateUnit] = duration.replace(' for ', '').split(' ');
    endMoment = endMoment.add(parseInt(durationValue), durationDateUnit.toLowerCase());
  } else if (exact) {
    endMoment = endMoment.add(1, 'second');
  } else {
    endMoment = endMoment.add(1, dateUnit);
  }

  let startStruct = chronoDateStructFromMoment(startMoment, timezone);
  let endStruct = chronoDateStructFromMoment(endMoment, timezone);

  if (shouldUseUTC(dateUnit) && timezone) {
    startStruct = convertResultFromUtc(startStruct, timezone);
    endStruct = convertResultFromUtc(endStruct, timezone);
  }

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    tags: { xAgoParser: true },
    index: match.index,
    start: startStruct,
    end: endStruct,
  });
};

export default parser;

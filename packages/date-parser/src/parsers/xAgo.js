import dateStructFromDate from '../helpers/dateStructFromDate';
import truncateDateStruct from '../helpers/truncateDateStruct';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import { DATE_UNIT_LEVELS } from '../constants';
import offsetTimezoneForJSDate from '../helpers/offsetTimezoneForJSDate';

const parser = {};

parser.pattern = () => {
  /* eslint-disable-next-line max-len */
  return new RegExp('(exact(?:ly)? )?(\\d+) (year|month|week|day|hour|minute|second)s? (ago|from now)( for \\d+ (?:year|month|week|day|hour|minute|second)s?)?', 'i');
};

/**
 * @param {Chrono.ParsingContext} context
 * @param {Array} match
 */
parser.extract = (context, match) => {
  const exact = !!match[1];
  const dateUnit = match[3].toLowerCase();
  const isPast = match[4] !== 'from now';
  const value = parseInt(match[2]) * (isPast ? -1 : 1);
  const duration = match[5];

  // hour level and above is affected by DST, using UTC is much simpler
  const shouldUseUTC = DATE_UNIT_LEVELS[dateUnit] >= DATE_UNIT_LEVELS.hour;

  let refDate = context.reference.instant;
  if (!shouldUseUTC) {
    refDate = offsetTimezoneForJSDate(refDate, context.option.timezone);
  }

  let refDateStruct = dateStructFromDate(refDate);
  if (!exact) {
    refDateStruct = truncateDateStruct(refDateStruct, dateUnit);
  }
  let startMoment = momentFromStruct(refDateStruct, { weekStartDay: context.option.weekStartDay });
  startMoment = startMoment.add(value, dateUnit);

  let endMoment = startMoment.clone();
  if (duration) {
    const [durationValue, durationDateUnit] = duration.replace(' for ', '').split(' ');
    endMoment = endMoment.add(parseInt(durationValue), durationDateUnit);
  } else if (exact) {
    endMoment = endMoment.add(1, 'second');
  } else {
    endMoment = endMoment.add(1, dateUnit);
  }

  const chronoStart = chronoDateStructFromMoment(startMoment);
  const chronoEnd = chronoDateStructFromMoment(endMoment);

  if (shouldUseUTC) {
    chronoStart.timezoneOffset = 0;
    chronoEnd.timezoneOffset = 0;
  }

  return context.createParsingResult(
    match.index,
    match[0],
    chronoStart,
    chronoEnd,
  );
};

export default parser;

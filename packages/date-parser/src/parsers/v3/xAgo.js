import Chrono from 'chrono-node';
import dateStructFromDate from '../../helpers/dateStructFromDate';
import truncateDateStruct from '../../helpers/truncateDateStruct';
import momentFromStruct from '../../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../../helpers/chronoDateStructFromMoment';
import { shouldUseUTC, convertResultFromUtc, adjustRefdate } from '../../helpers/utcParsingHelpers';

const parser = new Chrono.Parser();

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

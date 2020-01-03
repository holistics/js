import Chrono from 'chrono-node';
import Moment from 'moment';
import dateStructFromDate from '../helpers/dateStructFromDate';
import truncateDateStruct from '../helpers/truncateDateStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(exact(?:ly)? )?(\\d+) (year|month|week|day|hour|minute|second)s? (ago|from now)', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match) => {
  const exact = !!match[1];
  const dateUnit = match[3].toLowerCase();
  const isPast = match[4] !== 'from now';
  const value = parseInt(match[2]) * (isPast ? -1 : 1);

  let refDateStruct = dateStructFromDate(ref);
  if (!exact) {
    refDateStruct = truncateDateStruct(refDateStruct, dateUnit);
  }
  const startMoment = Moment.utc(refDateStruct);
  startMoment.add(value, dateUnit);

  const endMoment = startMoment.clone();
  if (exact) {
    endMoment.add(1, 'second');
  } else {
    endMoment.add(1, dateUnit);
  }

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    start: chronoDateStructFromMoment(startMoment),
    end: chronoDateStructFromMoment(endMoment),
  });
};

export default parser;

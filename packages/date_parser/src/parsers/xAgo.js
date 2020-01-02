import Chrono from 'chrono-node';
import Moment from 'moment';
import dateStructFromDate from '../helpers/dateStructFromDate';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(\\d+) (year|month|week|day|hour|minute|second)s? (ago|from now)', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match) => {
  const dateUnit = match[2].toLowerCase();
  const isPast = match[3] !== 'from now';
  const value = parseInt(match[1]) * (isPast ? -1 : 1);

  // console.log('ago');
  const refDateStruct = dateStructFromDate(ref);
  const startMoment = Moment.utc(refDateStruct);
  startMoment.add(value, dateUnit);
  // console.log('start', startMoment.toISOString());

  const endMoment = startMoment.clone();
  endMoment.add(1, 'second');
  // console.log('end', endMoment.toISOString());

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    start: chronoDateStructFromMoment(startMoment),
    end: chronoDateStructFromMoment(endMoment),
  });
};

export default parser;

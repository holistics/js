import Chrono from 'chrono-node';
import Moment from 'moment';
import truncateDateStruct from '../helpers/truncateDateStruct';
import dateStructFromDate from '../helpers/dateStructFromDate';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import isTimeUnit from '../helpers/isTimeUnit';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(last|next|this) ?((?<= )\\d+)? (year|month|week|day|hour|minute|second)s? ?((?<= )(?:begin|end))?', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match) => {
  const modifier = match[1];
  const value = modifier === 'this' ? 0 : parseInt(match[2] || 1);
  const dateUnit = match[3].toLowerCase();
  const pointOfTime = match[4];

  const refDateStruct = truncateDateStruct(dateStructFromDate(ref), dateUnit);
  let startMoment = Moment.utc(refDateStruct);
  let endMoment = startMoment.clone();

  // console.log('now', startMoment.toISOString());
  if (modifier === 'last') {
    startMoment.subtract(value, dateUnit);
    endMoment.subtract(1, dateUnit);
  } else if (modifier === 'next') {
    endMoment.add(value, dateUnit);
    startMoment.add(1, dateUnit);
  }
  // console.log('modified');
  // console.log('start', startMoment.toISOString());
  // console.log('end', endMoment.toISOString());

  startMoment.startOf(dateUnit === 'week' ? 'isoWeek' : dateUnit);
  endMoment.endOf(dateUnit === 'week' ? 'isoWeek' : dateUnit);
  endMoment.add(1, 'second').millisecond(0);
  // console.log('ranged');
  // console.log('start', startMoment.toISOString());
  // console.log('end', endMoment.toISOString());

  if (pointOfTime === 'begin') {
    endMoment = startMoment.clone().add(1, isTimeUnit(dateUnit) ? 'second' : 'day');
  } else if (pointOfTime === 'end') {
    startMoment = endMoment.clone().subtract(1, isTimeUnit(dateUnit) ? 'second' : 'day');
  }
  // console.log('pointed');
  // console.log('start', startMoment.toISOString());
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

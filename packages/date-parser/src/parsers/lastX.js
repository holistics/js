import Chrono from 'chrono-node';
import truncateDateStruct from '../helpers/truncateDateStruct';
import dateStructFromDate from '../helpers/dateStructFromDate';
import momentFromStruct from '../helpers/momentFromStruct';
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
  let startMoment = momentFromStruct(refDateStruct);
  let endMoment = startMoment.clone();

  // Set range according to past/future relativity
  if (modifier === 'last') {
    startMoment = startMoment.subtract(value, dateUnit);
    endMoment = endMoment.subtract(1, dateUnit);
  } else if (modifier === 'next') {
    endMoment = endMoment.add(value, dateUnit);
    startMoment = startMoment.add(1, dateUnit);
  }

  // Push start, end to start, end of time period
  startMoment = startMoment.startOf(dateUnit);
  endMoment = endMoment.endOf(dateUnit).add(1, 'second').millisecond(0);

  // Set to point of time if specified
  if (pointOfTime === 'begin') {
    endMoment = startMoment.add(1, isTimeUnit(dateUnit) ? 'second' : 'day');
  } else if (pointOfTime === 'end') {
    startMoment = endMoment.subtract(1, isTimeUnit(dateUnit) ? 'second' : 'day');
  }

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    tags: { lastXParser: true },
    start: chronoDateStructFromMoment(startMoment),
    end: chronoDateStructFromMoment(endMoment),
  });
};

export default parser;

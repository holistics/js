import Chrono from 'chrono-node';
import Moment from 'moment';
import dateStructFromDate from '../helpers/dateStructFromDate';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import truncateDateStruct from '../helpers/truncateDateStruct';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(today|yesterday|tomorrow)', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match) => {
  const date = match[1].toLowerCase();
  let value = 0;
  if (date === 'yesterday') {
    value = -1;
  } else if (date === 'tomorrow') {
    value = 1;
  }

  const refDateStruct = truncateDateStruct(dateStructFromDate(ref), 'day');
  const startMoment = Moment.utc(refDateStruct);
  startMoment.add(value, 'day');

  const endMoment = startMoment.clone();
  endMoment.add(1, 'day');

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    start: chronoDateStructFromMoment(startMoment),
    end: chronoDateStructFromMoment(endMoment),
  });
};

export default parser;

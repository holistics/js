import Chrono from 'chrono-node';
import dateStructFromDate from '../helpers/dateStructFromDate';
import truncateDateStruct from '../helpers/truncateDateStruct';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import { WEEKDAYS, WSD_REMAPPING } from '../constants';

const parser = new Chrono.Parser();

parser.pattern = () => {
  /* eslint-disable-next-line max-len */
  return new RegExp(`(${Object.keys(WEEKDAYS).join('|')}) (last|this|next)( \\d+)? weeks?`, 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 * @param {Object} opt
 */
parser.extract = (text, ref, match, opt) => {
  // We manually handle this case instead of using the wsd
  const { weekStartDate } = opt;
  const weekday = match[1].toLowerCase();
  const modifier = match[2];
  let value;
  if (modifier === 'this') {
    value = 0;
  } else if (modifier === 'last') {
    value = parseInt(match[3] || 1) * -1;
  } else {
    value = parseInt(match[3] || 1);
  }

  const refDateStruct = truncateDateStruct(dateStructFromDate(ref), 'day');
  let startMoment = momentFromStruct(refDateStruct, 1);
  if (startMoment.day() > weekStartDate && weekStartDate > WSD_REMAPPING[weekday]) {
    startMoment = startMoment.add(7, 'days');
  }
  startMoment = startMoment.add(value, 'week');
  startMoment = startMoment.weekday(WEEKDAYS[weekday]);

  const endMoment = startMoment.add(1, 'day');

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    tags: { weekdayParser: true },
    start: chronoDateStructFromMoment(startMoment),
    end: chronoDateStructFromMoment(endMoment),
  });
};

export default parser;

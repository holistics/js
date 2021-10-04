import Chrono from 'chrono-node';
import dateStructFromDate from '../helpers/dateStructFromDate';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import truncateDateStruct from '../helpers/truncateDateStruct';
import convertTimezone from '../helpers/convertTimezone';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(today|yesterday|tomorrow)', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match, opt) => {
  const { timezone } = opt;
  const adjustedRef = timezone ? convertTimezone(ref, timezone) : ref;

  const date = match[1].toLowerCase();
  let value = 0;
  if (date === 'yesterday') {
    value = -1;
  } else if (date === 'tomorrow') {
    value = 1;
  }

  const refDateStruct = truncateDateStruct(dateStructFromDate(adjustedRef), 'day');
  let startMoment = momentFromStruct(refDateStruct, { weekStartDay: opt.weekStartDay });
  startMoment = startMoment.add(value, 'day');

  const endMoment = startMoment.add(1, 'day');

  const startStruct = chronoDateStructFromMoment(startMoment, timezone);
  const endStruct = chronoDateStructFromMoment(endMoment, timezone);

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    tags: { todayParser: true },
    start: startStruct,
    end: endStruct,
  });
};

export default parser;

import Chrono from 'chrono-node';
import dateStructFromDate from '../helpers/dateStructFromDate';
import truncateDateStruct from '../helpers/truncateDateStruct';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import pluralize from '../helpers/pluralize';
import { WEEKDAYS_MAP } from '../constants';

const parser = new Chrono.Parser();

parser.pattern = () => {
  /* eslint-disable-next-line max-len */
  return new RegExp(`(${Object.keys(WEEKDAYS_MAP).join('|')}) (last|this|next)( \\d+)? weeks?`, 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 * @param {Object} opt
 */
parser.extract = (text, ref, match, opt) => {
  const { weekStartDay } = opt;
  const weekday = match[1].toLowerCase();
  const modifier = match[2].toLowerCase();
  let value;
  if (modifier === 'last') {
    value = parseInt(match[3] || 1) * -1;
  } else if (modifier === 'next') {
    value = parseInt(match[3] || 1);
  } else {
    value = 0;
  }

  const refDateStruct = truncateDateStruct(dateStructFromDate(ref), 'day');
  let startMoment = momentFromStruct(refDateStruct, { weekStartDay });
  startMoment = startMoment.add(value, 'week');
  startMoment = startMoment.weekday((7 + WEEKDAYS_MAP[weekday] - weekStartDay) % 7);

  const endMoment = startMoment.add(1, 'day');

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    // NOTE: just keeping normalized_text here for possible future UX improvement, it is not actually kept in Chrono.ParsedResult
    normalized_text: `${match[1]} ${match[2]}${value ? match[3] : ''} ${pluralize('week', value || 1)}`,
    index: match.index,
    tags: { weekdayParser: true },
    start: chronoDateStructFromMoment(startMoment),
    end: chronoDateStructFromMoment(endMoment),
  });
};

export default parser;

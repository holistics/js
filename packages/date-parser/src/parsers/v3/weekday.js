import Chrono from 'chrono-node';
import truncateDateStruct from '../../helpers/truncateDateStruct';
import pluralize from '../../helpers/pluralize';
import { WEEKDAYS_MAP } from '../../constants';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';
import luxonFromStruct from '../../helpers/luxonFromStruct';
import { startOfCustom } from '../../helpers/startEndOfCustom';
import weekdayIdxFromLuxon from '../../helpers/weekdayIdxFromLuxon';
import { ParsedResultExtra } from '../../helpers/ParsedResultExtra';

const parser = new Chrono.Parser();

const daysBetweeen = (startOfWeek, weekday) => {
  const fromWeekdayIdx = weekdayIdxFromLuxon(startOfWeek);
  const toWeekdayIdx = WEEKDAYS_MAP[weekday];

  if (fromWeekdayIdx <= toWeekdayIdx) { return toWeekdayIdx - fromWeekdayIdx; }

  return toWeekdayIdx + 7 - fromWeekdayIdx;
};

parser.pattern = () => {
  /* eslint-disable-next-line max-len */
  return new RegExp(`(${Object.keys(WEEKDAYS_MAP).join('|')}) (last|this|current|next)( \\d+)? weeks?`, 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 * @param {Object} opt
 */
parser.extract = (text, ref, match, opt) => {
  const { luxonRefInTargetTz, weekStartDay } = opt;

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

  const truncatedStruct = truncateDateStruct(dateStructFromLuxon(luxonRefInTargetTz), 'day', false);
  const truncatedLuxon = luxonFromStruct(truncatedStruct);

  const someWhereInTheWeek = truncatedLuxon.plus({ weeks: value });
  const startOfWeek = startOfCustom(someWhereInTheWeek, 'week', weekStartDay);

  const range = daysBetweeen(startOfWeek, weekday);

  const startDate = startOfWeek.plus({ days: range });
  const endDate = startDate.plus({ days: 1 });

  return new ParsedResultExtra({
    ref,
    text: match[0],
    // NOTE: just keeping normalized_text here for possible future UX improvement, it is not actually kept in Chrono.ParsedResult
    normalized_text: `${match[1]} ${match[2]}${value ? match[3] : ''} ${pluralize('week', value || 1)}`,
    index: match.index,
    tags: { weekdayParser: true },
    start: dateStructFromLuxon(startDate),
    end: dateStructFromLuxon(endDate),
    metadata: { incrementedUnit: 'day' },
  });
};

export default parser;

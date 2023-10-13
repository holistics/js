import ChronoNode from 'chrono-node';
import _compact from 'lodash/compact';

import dayjs from 'dayjs';

// NOTE: order is important to make sure chrono-node uses plugin-enabled dayjs
import './initializers/dayjs';
import './initializers/chrono-node';

import options from './options';
import isValidDate from './helpers/isValidDate';
import {
  WEEKDAYS,
  WEEKDAYS_MAP,
  OUTPUT_TYPES,
  DATE_RANGE_KEYWORDS,
} from './constants';
import Errors, { InputError } from './errors';

import splitInputStr from './helpers/splitInputString';
import getParsedResultBoundaries from './helpers/getParsedResultBoundaries';
import exceedLimit from './helpers/checkDateStringCharacterLimit';

const chrono = new ChronoNode.Chrono(options);

/**
 * Parse the given date string into Chrono.ParsedResult
 * @param {String} str The date string to parse
 * @param {String|Date} ref Reference date
 * @param {Object} options
 * @param {Number} options.timezoneOffset Timezone offset in minutes
 * @param {OUTPUT_TYPES} options.output Type of the output dates
 * @param {Number} weekStartDay The weekday chosen to be the start of a week. See WEEKDAYS constant for possible values
 * @return {ChronoNode.ParsedResult|Array}
 */
export const parse = (str, ref, { timezoneOffset = 0, output = OUTPUT_TYPES.parsed_component, weekStartDay = WEEKDAYS.Monday } = {}) => {
  const refDate = new Date(ref);
  if (!isValidDate(refDate)) throw new InputError(`Invalid reference date: ${ref}`);
  if (exceedLimit(str)) throw new InputError('Date value exceeds limit of 200 characters');

  /* eslint-disable-next-line no-param-reassign */
  timezoneOffset = parseInt(timezoneOffset);
  if (Number.isNaN(timezoneOffset)) throw new InputError(`Invalid timezoneOffset: ${timezoneOffset}`);

  if (!(weekStartDay in WEEKDAYS_MAP)) throw new InputError(`Invalid weekStartDay: ${weekStartDay}. See exported constant WEEKDAYS for valid values`);
  /* eslint-disable-next-line no-param-reassign */
  weekStartDay = WEEKDAYS_MAP[weekStartDay];

  // Adjust refDate by timezoneOffset
  let refMoment = dayjs.utc(refDate);
  refMoment = refMoment.add(timezoneOffset, 'minute');
  const refDateAdjustedByTz = refMoment.toDate();

  const splittedInput = splitInputStr(str);
  const { parts, rangeSeparator } = splittedInput;
  let { isRange, isRangeEndInclusive } = splittedInput;

  const parsedResults = _compact(parts.map(part => chrono.parse(part, refDateAdjustedByTz, { timezoneOffset, weekStartDay })[0]));

  if (output === OUTPUT_TYPES.raw) return parsedResults;

  if (!parsedResults[0]) return null;
  if (parsedResults.length === 1) {
    isRange = false;
    isRangeEndInclusive = true;
  }

  const { first, last, hasOrderChanged } = getParsedResultBoundaries(parsedResults, isRangeEndInclusive);
  if (hasOrderChanged && !isRangeEndInclusive) {
    throw new InputError(`Start date must be before end date when using end-exclusive syntax (${DATE_RANGE_KEYWORDS.rangeEndExclusive})`);
  }

  const result = new ChronoNode.ParsedResult({
    ref: refDate,
    index: first.index,
    tags: { ...first.tags, ...last.tags },
    text: isRange ? `${first.text} ${rangeSeparator} ${last.text}` : first.text,
  });
  result.start = first.start.clone();
  result.end = isRangeEndInclusive ? last.end.clone() : last.start.clone();

  if (output === OUTPUT_TYPES.date) {
    result.start = result.start.moment().format('YYYY-MM-DD');
    result.end = result.end.moment().format('YYYY-MM-DD');
  } else if (output === OUTPUT_TYPES.timestamp) {
    result.start = result.start.date().toISOString();
    result.end = result.end.date().toISOString();
  }

  return result;
};

export { WEEKDAYS, OUTPUT_TYPES } from './constants';
export { default as Errors } from './errors';

export default {
  parse,
  WEEKDAYS,
  OUTPUT_TYPES,
  Errors,
};

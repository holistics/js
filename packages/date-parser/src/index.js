import ChronoNode from 'chrono-node';
import _flatten from 'lodash/flatten';

import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import utcPlugin from 'dayjs/plugin/utc';
import weekdayPlugin from 'dayjs/plugin/weekday';

import options from './options';
import isValidDate from './helpers/isValidDate';
import { OUTPUT_TYPES, DATE_RANGE_PATTERNS } from './constants';
import Errors, { InputError } from './errors';

// https://github.com/iamkun/dayjs/issues/215#issuecomment-471280396
// note that this makes weekday(0) -> monday
dayjs.locale({
  ...en,
  weekStart: 1,
});
dayjs.extend(weekdayPlugin);
dayjs.extend(utcPlugin);

const chrono = new ChronoNode.Chrono(options);

const splitInputStr = (str) => {
  let parts = [str];
  let isRangeEndInclusive = true;
  let rangeSeparator;
  let matches;

  if (str.match(DATE_RANGE_PATTERNS.rangeEndInclusive)) {
    matches = str.match(DATE_RANGE_PATTERNS.rangeEndInclusive);
    isRangeEndInclusive = true;
  } else if (str.match(DATE_RANGE_PATTERNS.rangeEndExclusive)) {
    matches = str.match(DATE_RANGE_PATTERNS.rangeEndExclusive);
    isRangeEndInclusive = false;
  }

  if (matches) {
    rangeSeparator = matches[2];
    parts = [matches[1], matches[3]];
  }

  return {
    isRange: !!rangeSeparator,
    parts,
    rangeSeparator,
    isRangeEndInclusive,
  };
};

/**
 * Parse the given date string into Chrono.ParsedResult
 * @param {String} str The date string to parse
 * @param {String|Date} ref Reference date
 * @param {Object} options
 * @param {Number} options.timezoneOffset Timezone offset in minutes
 * @param {OUTPUT_TYPES} options.output Type of the output dates
 * @return {ChronoNode.ParsedResult|Array}
 */
export const parse = (str, ref, { timezoneOffset = 0, output = OUTPUT_TYPES.parsed_component } = {}) => {
  const refDate = new Date(ref);
  if (!isValidDate(refDate)) throw new InputError(`Invalid reference date: ${ref}`);

  /* eslint-disable-next-line no-param-reassign */
  timezoneOffset = parseInt(timezoneOffset);
  if (Number.isNaN(timezoneOffset)) throw new InputError(`Invalid timezoneOffset: ${timezoneOffset}`);

  // Adjust refDate by timezoneOffset
  let refMoment = dayjs.utc(refDate);
  refMoment = refMoment.add(timezoneOffset, 'minute');
  const refDateAdjustedByTz = refMoment.toDate();

  const { isRange, parts, rangeSeparator, isRangeEndInclusive } = splitInputStr(str);

  const parsedResults = _flatten(parts.map(part => chrono.parse(part, refDateAdjustedByTz, { timezoneOffset })));

  if (output === OUTPUT_TYPES.raw) return parsedResults;

  const first = parsedResults[0];
  if (!first) return null;

  const last = parsedResults[parsedResults.length - 1];

  const result = new ChronoNode.ParsedResult({
    ref: refDate,
    index: first.index,
    tags: { ...first.tags, ...last.tags },
    text: isRange ? `${first.text} ${rangeSeparator} ${last.text}` : first.text,
  });
  result.start = first.start.clone();
  result.end = isRangeEndInclusive ? last.end.clone() : last.start.clone();

  if (output === OUTPUT_TYPES.date) {
    result.start = result.start.moment().utcOffset(timezoneOffset).format('YYYY-MM-DD');
    result.end = result.end.moment().utcOffset(timezoneOffset).format('YYYY-MM-DD');
  } else if (output === OUTPUT_TYPES.timestamp) {
    result.start = result.start.date().toISOString();
    result.end = result.end.date().toISOString();
  }

  return result;
};

export { OUTPUT_TYPES } from './constants';
export { default as Errors } from './errors';

export default {
  parse,
  OUTPUT_TYPES,
  Errors,
};

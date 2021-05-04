import ChronoNode from 'chrono-node';
import _compact from 'lodash/compact';
import _some from 'lodash/some';

import dayjs from 'dayjs';
import en from 'dayjs/locale/en';

// NOTE: order is important to make sure chrono-node uses plugin-enabled dayjs
import './initializers/dayjs';
import './initializers/chrono-node';

import options from './options';
import isValidDate from './helpers/isValidDate';
import { OUTPUT_TYPES, DATE_RANGE_PATTERNS, DATE_RANGE_KEYWORDS } from './constants';
import Errors, { InputError } from './errors';

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

const getParsedResultBoundaries = (parsedResults) => {
  const sortedResults = parsedResults.slice().sort((a, b) => {
    if (a.end.moment().isBefore(b.start.moment())) return -1;
    if (a.start.moment().isAfter(b.end.moment())) return 1;
    return 0;
  });
  const hasOrderChanged = _some(sortedResults, (r, i) => parsedResults[i] !== r);
  const first = sortedResults[0];
  const last = sortedResults[sortedResults.length - 1];
  return { first, last, hasOrderChanged };
};

/**
 * Parse the given date string into Chrono.ParsedResult
 * @param {String} str The date string to parse
 * @param {String|Date} ref Reference date
 * @param {Object} options
 * @param {Number} options.timezoneOffset Timezone offset in minutes
 * @param {OUTPUT_TYPES} options.output Type of the output dates
 * @param {Number} weekStartDate Default weekStartDate is 1 (Monday)
 * @return {ChronoNode.ParsedResult|Array}
 */
export const parse = (str, ref, { timezoneOffset = 0, output = OUTPUT_TYPES.parsed_component } = {}, weekStartDate = 1) => {
  dayjs.locale({
    ...en,
    weekStart: weekStartDate,
  });

  const refDate = new Date(ref);
  if (!isValidDate(refDate)) throw new InputError(`Invalid reference date: ${ref}`);

  /* eslint-disable-next-line no-param-reassign */
  timezoneOffset = parseInt(timezoneOffset);
  if (Number.isNaN(timezoneOffset)) throw new InputError(`Invalid timezoneOffset: ${timezoneOffset}`);

  // Adjust refDate by timezoneOffset
  let refMoment = dayjs.utc(refDate);
  refMoment = refMoment.add(timezoneOffset, 'minute');
  const refDateAdjustedByTz = refMoment.toDate();

  const splittedInput = splitInputStr(str);
  const { parts, rangeSeparator } = splittedInput;
  let { isRange, isRangeEndInclusive } = splittedInput;

  const parsedResults = _compact(parts.map(part => chrono.parse(part, refDateAdjustedByTz, { timezoneOffset })[0]));

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

export { OUTPUT_TYPES } from './constants';
export { default as Errors } from './errors';

export default {
  parse,
  OUTPUT_TYPES,
  Errors,
};

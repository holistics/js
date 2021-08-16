import { Chrono } from 'chrono-node';
import _compact from 'lodash/compact';
import _some from 'lodash/some';

import dayjs from 'dayjs';

// NOTE: order is important to make sure chrono-node uses plugin-enabled dayjs
import './initializers/dayjs';
import optionsV2 from './optionsV2';

import isValidDate from './helpers/isValidDate';
import {
  WEEKDAYS,
  WEEKDAYS_MAP,
  OUTPUT_TYPES,
  DATE_RANGE_PATTERNS,
  DATE_RANGE_KEYWORDS,
} from './constants';
import Errors, { InputError } from './errors';
import PostResult from './result';

const chrono = new Chrono(optionsV2);

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
    if (a.end.dayjs().isBefore(b.start.dayjs())) return -1;
    if (a.start.dayjs().isAfter(b.end.dayjs())) return 1;
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
 * @param {String} options.timezone Timezone region
 * @param {OUTPUT_TYPES} options.output Type of the output dates
 * @param {Number} weekStartDay The weekday chosen to be the start of a week. See WEEKDAYS constant for possible values
 * @return {ChronoNode.ParsedResult|Array}
 */
export const parse = (str, ref, { timezone = 'Etc/UTC', output = OUTPUT_TYPES.parsed_component, weekStartDay = WEEKDAYS.Monday } = {}) => {
  const refDate = new Date(ref);

  if (!isValidDate(refDate)) throw new InputError(`Invalid reference date: ${ref}`);

  try {
    // Check if timezone is valid by parsing a random date
    dayjs.tz('2016-05-01 12:00:00', timezone);
  } catch (err) {
    throw new InputError(`Invalid time zone: ${timezone}`);
  }

  if (!(weekStartDay in WEEKDAYS_MAP)) throw new InputError(`Invalid weekStartDay: ${weekStartDay}. See exported constant WEEKDAYS for valid values`);
  /* eslint-disable-next-line no-param-reassign */
  weekStartDay = WEEKDAYS_MAP[weekStartDay];

  // Adjust refDate by timezone, then change its timezone without changing its absolute value
  const refMoment = dayjs.tz(refDate, timezone).utc(true).toDate();

  const parsingReference = {
    instant: refMoment,
    timezone: 0, // We will handle tz offset by timezone refiner
  };

  const splittedInput = splitInputStr(str);
  const { parts, rangeSeparator } = splittedInput;
  let { isRange, isRangeEndInclusive } = splittedInput;

  const parsedResults = _compact(parts.map(part => chrono.parse(part, parsingReference, { weekStartDay, timezone })[0]));

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

  const postResult = new PostResult({
    ref: refDate,
    index: first.index,
    text: isRange ? `${first.text} ${rangeSeparator} ${last.text}` : first.text,
    start: first.start.clone(),
    end: isRangeEndInclusive ? last.end.clone() : last.start.clone(),
    timezone,
  });

  switch (output) {
    case OUTPUT_TYPES.date:
      return postResult.asDateType();
    case OUTPUT_TYPES.timestamp:
      return postResult.asTimestampType();
    case OUTPUT_TYPES.dayjs:
      return postResult.asDayJsType();
    default:
      return postResult.asChronoType();
  }
};

export { WEEKDAYS, OUTPUT_TYPES } from './constants';
export { default as Errors } from './errors';

export default {
  parse,
  WEEKDAYS,
  OUTPUT_TYPES,
  Errors,
};

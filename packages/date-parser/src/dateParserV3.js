import _compact from 'lodash/compact';
// NOTE: order is important to make sure chrono-node uses plugin-enabled dayjs
import ChronoNode from 'chrono-node';
import './initializers/dayjs';
import './initializers/chrono-node';
import options from './optionsV3';

import isValidDate from './helpers/isValidDate';
import TimezoneRegion from './helpers/timezoneRegion';
import splitInputStr from './helpers/splitInputString';
import getParsedResultBoundaries from './helpers/getParsedResultBoundaries';
import { InputError } from './errors';
import {
  WEEKDAYS,
  WEEKDAYS_MAP,
  OUTPUT_TYPES,
  DATE_RANGE_KEYWORDS,
  PARSER_VERSION_3,
} from './constants';
import Result from './result';
import luxonFromJSDate from './helpers/luxonFromJSDate';

/**
 * @param {String} ref
 * @param {String} weekStartDay
 * @returns { refDate: Date, wsday: Number}
 */
const parseInputs = (ref, weekStartDay) => {
  const jsRefDate = new Date(ref);
  if (!isValidDate(jsRefDate)) throw new InputError(`Invalid reference date: ${ref}`);

  if (!(weekStartDay in WEEKDAYS_MAP)) throw new InputError(`Invalid weekStartDay: ${weekStartDay}. See exported constant WEEKDAYS for valid values`);
  const wsday = WEEKDAYS_MAP[weekStartDay];

  return {
    jsRefDate,
    wsday,
  };
};

/**
 *
 * @param {Chrono.ParsedResult} parsedResults
 * @param {String} strInput Original input
 * @param {Date} refDate
 * @param {String} weekStartDay
 * @returns
 */
const buildResult = (parsedResults, strInput, refDate, weekStartDay) => {
  if (!parsedResults[0]) return null;

  const {
    isRange: inputIsRange,
    isRangeEndInclusive: inputIsRangeEndInclusive,
    rangeSeparator,
  } = splitInputStr(strInput);

  let isRange;
  let isRangeEndInclusive;

  if (parsedResults.length === 1) {
    isRange = false;
    isRangeEndInclusive = true;
  } else {
    isRange = inputIsRange;
    isRangeEndInclusive = inputIsRangeEndInclusive;
  }

  const { first, last, hasOrderChanged } = getParsedResultBoundaries(parsedResults, isRangeEndInclusive);
  if (hasOrderChanged && !isRangeEndInclusive) {
    throw new InputError(`Start date must be before end date when using end-exclusive syntax (${DATE_RANGE_KEYWORDS.rangeEndExclusive})`);
  }

  const result = new Result({
    ref: refDate,
    index: first.index,
    text: isRange ? `${first.text} ${rangeSeparator} ${last.text}` : first.text,
    start: first.start.clone(),
    end: isRangeEndInclusive ? last.end.clone() : last.start.clone(),
    weekStartDay,
  });

  return result;
};

/**
 * Parse the given date string into Chrono.ParsedResult
 * @param {String} str The date string to parse
 * @param {String|Date} ref Reference date
 * @param {OUTPUT_TYPES} output Type of the output dates
 * @param {Number} weekStartDay The weekday chosen to be the start of a week. See WEEKDAYS constant for possible values
 * @param {String} timezoneRegion timezone region, only available in V3 parser
 * @return {ChronoNode.ParsedResult|Array}
 */
export const parse = (str, ref, {
  timezoneRegion = 'Etc/UTC',
  output = OUTPUT_TYPES.timestamp,
  weekStartDay = WEEKDAYS.Monday,
} = {}) => {
  /**
   * Inputs parsing and validation
   */
  const { jsRefDate, wsday } = parseInputs(ref, weekStartDay);
  const zone = new TimezoneRegion(timezoneRegion);
  const { parts } = splitInputStr(str);
  const luxonRefUtc = luxonFromJSDate(jsRefDate);
  const luxonRefInTargetTz = luxonRefUtc.setZone(zone.toString());
  /**
   * Chrono processing
   */
  const chrono = new ChronoNode.Chrono(options);
  const parsedResults = _compact(
    parts.map(
      part => chrono.parse(part, jsRefDate, {
        timezone: zone.toString(),
        weekStartDay: wsday,
        parserVersion: PARSER_VERSION_3,
        luxonRefUtc,
        luxonRefInTargetTz,
      })[0],
    ),
  );

  /**
   * Parsed result processing
   */
  const result = buildResult(parsedResults, str, jsRefDate, weekStartDay);

  if (!result) { return null; }

  switch (output) {
    case OUTPUT_TYPES.date:
      return result.asDate();
    case OUTPUT_TYPES.timestamp:
      return result.asTimestamp();
    case OUTPUT_TYPES.timestamp_utc:
      return result.asTimestampUtc();
    case OUTPUT_TYPES.luxon:
      return result.asLuxon();
    case OUTPUT_TYPES.raw:
      return result;
    default:
      return result.asTimestamp();
  }
};

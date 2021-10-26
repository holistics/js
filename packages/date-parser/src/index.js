import { parse as parseV1 } from './dateParserV1';
import { parse as parseV3 } from './dateParserV3';
import { WEEKDAYS, OUTPUT_TYPES } from './constants';
import Errors from './errors';

/**
 * Parse the given date string into Chrono.ParsedResult
 * @param {String} str The date string to parse
 * @param {String|Date} ref Reference date
 * @param {Object} options
 * @param {Number} options.timezoneOffset Timezone offset in minutes
 * @param {OUTPUT_TYPES} options.output Type of the output dates
 * @param {Number} weekStartDay The weekday chosen to be the start of a week. See WEEKDAYS constant for possible values
 * @param {Number} parserVersion V1 supports timezone offset while V3 supports timezone region only. Use for backward compatabiblity
 * @param {String} timezoneRegion timezone region, only available in V3 parser
 * @return {ChronoNode.ParsedResult|Array}
 */
export const parse = (str, ref, {
  timezoneOffset = 0,
  timezoneRegion = 'Etc/UTC',
  output = OUTPUT_TYPES.parsed_component,
  weekStartDay = WEEKDAYS.Monday,
  parserVersion = 1,
} = {}) => {
  if (parserVersion === 3) {
    return parseV3(str, ref, { timezoneRegion, output, weekStartDay });
  }

  // V1 parser that supports timezone offset
  return parseV1(str, ref, { timezoneOffset, output, weekStartDay });
};

export { WEEKDAYS, OUTPUT_TYPES } from './constants';
export { default as Errors } from './errors';

export default {
  parse,
  WEEKDAYS,
  OUTPUT_TYPES,
  Errors,
};

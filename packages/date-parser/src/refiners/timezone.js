import dayjs from 'dayjs';
import { isNil } from 'lodash';

/**
 *
 * @param {Chrono.ParsedComponents} parsedComponent
 */
const implyTimezone = (parsedComponent, timezone) => {
  const offset = dayjs.tz(parsedComponent.date(), timezone).utcOffset();
  parsedComponent.imply('timezoneOffset', (offset || 0));
};

const timezoneRefiner = {};

/**
 * @param {ParsingContext} context
 * @param {ParsedResult[]} results
 * @return {ParsedResult[]}
 */
timezoneRefiner.refine = (context, results) => {
  const { timezone } = context.option;

  return results.map(res => {
    // If input is an ISO string, then timezone is already extracted from the input,
    // thus timezoneOffset is not nil
    if (isNil(res.start.get('timezoneOffset')) && res.start) implyTimezone(res.start, timezone);
    if (isNil(res.end.get('timezoneOffset')) && res.end) implyTimezone(res.end, timezone);
    return res;
  });
};

export default timezoneRefiner;

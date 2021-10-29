import Chrono from 'chrono-node';
import { difference, keys, pick } from 'lodash';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';
import luxonFromChronoStruct from '../../helpers/luxonFromChronoStruct';

const { parser } = Chrono;

const convertToTimezone = (parsedResult, timezone) => {
  const luxon = luxonFromChronoStruct(parsedResult);

  // build a UTC luxon from Chrono
  const utc = luxon
    .plus({ minutes: -parsedResult.get('timezoneOffset') || 0 })
    .setZone('Etc/UTC', { keepLocalTime: true });

  const timestamptz = utc.setZone(timezone);

  return dateStructFromLuxon(timestamptz);
};

// Use the value from dateStruct to build a new Chrono Result
// The structure of the new result follows the existing Chrono Result  { knownValues, impliedValues }
const buildChronoResultFrom = (chronoResult, dateStruct) => {
  const knownKeys = keys(chronoResult.knownValues);
  const knownValues = pick(dateStruct, knownKeys);
  const impliedValues = pick(dateStruct, difference(keys(dateStruct), knownKeys));
  return { knownValues, impliedValues };
};

/**
 * Wrap the Chrono ENISOFormatParser to convert the result to target timezone
 *
 * ISO is a special case where the text contains the timezone offset by itself,
 *  e.g. 2021-10-12 20:00:00.000Z, 2021-10-12 20:00:00.000+01:00
 *
 *  */
const wrapChronoISOParser = (parserConfig) => {
  const chronoParser = new parser.ENISOFormatParser(parserConfig);

  const wrappedParser = new Chrono.Parser();

  wrappedParser.pattern = () => {
    return chronoParser.pattern();
  };

  wrappedParser.extract = (text, ref, match, opt) => {
    const result = chronoParser.extract(text, ref, match, opt);
    const { timezone } = opt;

    if (result.start) {
      const convertedStruct = convertToTimezone(result.start, timezone);
      const { knownValues, impliedValues } = buildChronoResultFrom(result.start, convertedStruct);
      result.start.knownValues = knownValues;
      result.start.impliedValues = impliedValues;
    }

    return result;
  };

  return wrappedParser;
};

export default wrapChronoISOParser;

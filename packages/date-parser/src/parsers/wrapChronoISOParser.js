import Chrono from 'chrono-node';
import { difference, keys, pick } from 'lodash';
import dateStructFromLuxon from '../helpers/dateStructFromLuxon';
import luxonFromChronoStruct from '../helpers/luxonFromChronoStruct';

const { parser } = Chrono;

const convertToUtc = (parsedResult) => {
  const luxon = luxonFromChronoStruct(parsedResult);
  const utc = luxon
    .plus({ minutes: -parsedResult.get('timezoneOffset') || 0 })
    .setZone('Etc/UTC', { keepLocalTime: true });
  return dateStructFromLuxon(utc);
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
 * Wrap the Chrono ENISOFormatParser to imply the result to be in UTC, not in target timezone
 *
 * ISO is a special case where the text contains the timezone offset by itself,
 *  e.g. 2021-10-12 20:00:00.000Z, 2021-10-12 20:00:00.000+01:00
 *
 * We will assume that ISO is always UTC, and we don't support ISO with custom offset like +01:00
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

    if (opt.parserVersion === 2 && result.start) {
      const utcDateStruct = convertToUtc(result.start);
      const { knownValues, impliedValues } = buildChronoResultFrom(result.start, utcDateStruct);
      result.start.knownValues = knownValues;
      result.start.impliedValues = impliedValues;
    }

    return result;
  };

  return wrappedParser;
};

export default wrapChronoISOParser;

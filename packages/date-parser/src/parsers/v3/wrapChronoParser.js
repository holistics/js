import Chrono from 'chrono-node';
import {
  difference, keys, pick, isNumber,
} from 'lodash';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';
import luxonFromChronoStruct from '../../helpers/luxonFromChronoStruct';

const convertToTimezone = (parsedResult, timezone) => {
  // build a UTC luxon from Chrono
  const luxon = luxonFromChronoStruct(parsedResult);
  const utc = luxon
    .plus({ minutes: -parsedResult.get('timezoneOffset') || 0 })
    .setZone('Etc/UTC', { keepLocalTime: true });

  const timestamptz = utc.setZone(timezone);

  return dateStructFromLuxon(timestamptz);
};

const isSetOffset = (parsedComponent) => {
  return isNumber(parsedComponent.get('timezoneOffset'));
};

// Use the value from dateStruct to build a new Chrono Result
// The structure of the new result follows the existing Chrono Result  { knownValues, impliedValues }
const buildChronoResultFrom = (chronoResult, dateStruct) => {
  const knownKeys = keys(chronoResult.knownValues);
  const knownValues = pick(dateStruct, knownKeys);
  const impliedValues = pick(dateStruct, difference(keys(dateStruct), knownKeys));
  return { knownValues, impliedValues };
};

const buildJSDateFromLuxon = (luxon) => {
  const wallclockTime = luxon.toISO({ includeOffset: false });
  const adjustedRef = new Date(`${wallclockTime}Z`);
  return adjustedRef;
};

/**
 * Relative Chrono parsers E.g. 3 o'clock
 *
 */
const wrapRelativeChronoParser = (ChronoParser, parserConfig) => {
  const chronoParser = new ChronoParser(parserConfig);
  const wrappedParser = new Chrono.Parser();

  wrappedParser.pattern = () => {
    return chronoParser.pattern();
  };

  wrappedParser.extract = (text, ref, match, opt) => {
    const { luxonRefInTargetTz } = opt;

    /**
     * Normally, in our custom parsers, we're using luxonRefInTargetTz as our `ref` which is already in the correct timezone.
     * However, Chrono parser is still using a JS Date which is still in UTC.
     * So we need convert that JS `ref` to the target timezone before passing into Chrono parsers.
     */
    const adjustedRef = buildJSDateFromLuxon(luxonRefInTargetTz);

    const result = chronoParser.extract(text, adjustedRef, match, opt);
    if (!result) { return null; }

    // Explicitly set the offset to be 0 to avoid Chrono doing its own timezone conversion
    result.start.imply('timezonOffset', 0);

    return result;
  };

  return wrappedParser;
};

/**
 * Absolute Chrono parsers are parsers that process ISO-like format string.
 * E.g. 2021, 2021-11-20, 2021-11-20T12:00:00Z
 *
 * The Chrono parser returns 2 types of result
 * - Timestamp with offset: we want to convert the result into our target timezone to match our common interface
 * - Timestamp without offset: we set it to 0 to avoid Chrono auto imply an offset that can cause some timezone bugs
 */
const wrapAbsoluteChronoParser = (ChronoParser, parserConfig) => {
  const chronoParser = new ChronoParser(parserConfig);
  const originalExtractFunc = chronoParser.extract;

  chronoParser.extract = (text, ref, match, opt) => {
    const { timezone } = opt;

    const result = originalExtractFunc(text, ref, match, opt);
    if (!result) { return null; }

    if (!isSetOffset(result.start)) {
      result.start.imply('timezoneOffset', 0);
      return result;
    }

    const convertedStruct = convertToTimezone(result.start, timezone);

    const { knownValues, impliedValues } = buildChronoResultFrom(result.start, convertedStruct);
    result.start.knownValues = knownValues;
    result.start.impliedValues = impliedValues;

    return result;
  };

  return chronoParser;
};

export { wrapAbsoluteChronoParser, wrapRelativeChronoParser };

import Chrono from 'chrono-node';
import { difference, keys, pick } from 'lodash';
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
    // Note that the correct timezone of this result is target timezone, and it will be set in the timezone refiner
    result.start.imply('timezonOffset', 0);

    return result;
  };

  return wrappedParser;
};

const wrapAbsoluteChronoParser = (ChronoParser, parserConfig) => {
  const chronoParser = new ChronoParser(parserConfig);
  const wrappedParser = new Chrono.Parser();

  wrappedParser.pattern = () => {
    return chronoParser.pattern();
  };

  wrappedParser.extract = (text, ref, match, opt) => {
    const { timezone } = opt;

    const utcResult = chronoParser.extract(text, ref, match, opt);
    if (!utcResult) { return null; }

    // Convert the utc result to target timezone result
    const convertedStruct = convertToTimezone(utcResult.start, timezone);
    const { knownValues, impliedValues } = buildChronoResultFrom(utcResult.start, convertedStruct);
    const convertedResult = utcResult; // new variable just for clarity
    convertedResult.start.knownValues = knownValues;
    convertedResult.start.impliedValues = impliedValues;

    return convertedResult;
  };

  return wrappedParser;
};

export { wrapAbsoluteChronoParser, wrapRelativeChronoParser };

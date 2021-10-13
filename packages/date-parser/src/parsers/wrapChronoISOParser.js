import Chrono from 'chrono-node';

const { parser } = Chrono;

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

    if (opt.timezone && result.start) {
      result.start.imply('timezone', 'Etc/UTC');
    }

    return result;
  };

  return wrappedParser;
};

export default wrapChronoISOParser;

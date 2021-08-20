import ENTimeExpressionParser from 'chrono-node/dist/locales/en/parsers/ENTimeExpressionParser';
import offsetTimezoneForJSDate from '../helpers/offsetTimezoneForJSDate';


// Wrap the Chrono ENTimeExpressionParser to offset the reference by timezone
//
// This Chrono parser resolve terms like "at o'clock, at night..." which must be
// resolved in correct timezone
//
const buildParser = (stricMode) => {
  const chronoParser = new ENTimeExpressionParser(stricMode);

  const parser = {};
  parser.pattern = () => {
    return chronoParser.pattern();
  };

  parser.extract = (context, match) => {
    const offsetRef = offsetTimezoneForJSDate(context.reference.instant, context.option.timezone);

    const ref = { ...context.reference, instant: offsetRef };
    context.reference = ref;

    return chronoParser.extract(context, match);
  };

  return parser;
};

export default buildParser;

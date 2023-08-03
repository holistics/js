import Chrono from 'chrono-node';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';

const parser = new Chrono.Parser();

parser.pattern = () => {
  /*
    Date format with slash "/" between numbers like ENSlashDateFormatParser,
    but this parser expect year before month.
    - YYYY/MM
    - YYYY-MM
  */

  const delimiter = '[\\/-]';
  const year = '([0-9]{4})';
  const month = '(?:([0-9]{1,2}))';
  const endOfWord = '(?=\\W|$)';

  const PATTERN = new RegExp(
    year + delimiter + month + endOfWord,
    'i',
  );

  return PATTERN;
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match, opt) => {
  const year = parseInt(match[1]);
  const month = parseInt(match[2]);
  const day = 1;

  if (month < 1 || month > 12) return null;

  const { timezone } = opt;

  const startMoment = momentFromStruct(
    {
      year,
      month: month - 1, // 0 is Jan
      day,
      hour: 0,
      minute: 0,
      second: 0,
    },
    { weekStartDay: opt.weekStartDay },
  );
  const endMoment = startMoment.add(1, 'month');

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    tags: { myCustomParser: true },
    start: {
      ...chronoDateStructFromMoment(startMoment),
      timezone,
    },
    end: {
      ...chronoDateStructFromMoment(endMoment),
      timezone,
    },
  });
};

export default parser;

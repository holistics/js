import Chrono from 'chrono-node';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(\\d\\d\\d\\d)');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match, opt) => {
  const year = parseInt(match[1]);
  const month = 1;
  const day = 1;
  const { timezone } = opt;

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    tags: { yearParser: true },
    start: {
      year, month, day, timezone,
    },
    end: {
      year: year + 1, month, day, timezone,
    },
  });
};

export default parser;

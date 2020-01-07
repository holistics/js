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
parser.extract = (text, ref, match) => {
  const year = parseInt(match[1]);
  const month = 1;
  const day = 1;

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    tags: { yearParser: true },
    start: { year, month, day },
    end: { year: year + 1, month, day },
  });
};

export default parser;

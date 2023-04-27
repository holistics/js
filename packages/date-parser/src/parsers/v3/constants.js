import Chrono from 'chrono-node';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';
import { ParsedResultExtra } from '../../helpers/ParsedResultExtra';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(beginning|now)', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 * @param {Object} opt
 */
parser.extract = (text, ref, match, opt) => {
  const date = match[1].toLowerCase();
  const { luxonRefInTargetTz } = opt;

  let start;
  let end;

  /* istanbul ignore else */
  if (date === 'beginning') {
    start = {
      year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0, timezone: 'Etc/UTC',
    };
  } else if (date === 'now') {
    start = dateStructFromLuxon(luxonRefInTargetTz);
  }

  return new ParsedResultExtra({
    ref,
    text: match[0],
    index: match.index,
    tags: { constantParser: true },
    start,
    end,
    metadata: { },
  });
};

export default parser;

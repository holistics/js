import Chrono from 'chrono-node';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';
import luxonFromJSDate from '../../helpers/luxonFromJSDate';

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

  const { timezone } = opt;

  let start;
  let end;

  /* istanbul ignore else */
  if (date === 'beginning') {
    start = {
      year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0, timezone: 'Etc/UTC',
    };
  } else if (date === 'now') {
    const nowUtc = luxonFromJSDate(ref);
    const nowInTargetTz = nowUtc.setZone(timezone);

    start = dateStructFromLuxon(nowInTargetTz);
  }

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    tags: { constantParser: true },
    start,
    end,
  });
};

export default parser;

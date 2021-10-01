import Chrono from 'chrono-node';
import dateStructFromDate from '../helpers/dateStructFromDate';
import convertTimezone from '../helpers/convertTimezone';

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
      year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
    };
    if (timezone) {
      start = { ...start, timezone: 'Etc/UTC' };
    }
  } else if (date === 'now') {
    const adjustedRef = timezone ? convertTimezone(ref, timezone) : ref;

    const refDateStruct = dateStructFromDate(adjustedRef, timezone);
    const nowDateStruct = { ...refDateStruct, month: refDateStruct.month + 1 };
    start = nowDateStruct;
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

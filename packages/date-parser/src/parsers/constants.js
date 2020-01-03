import Chrono from 'chrono-node';
import dateStructFromDate from '../helpers/dateStructFromDate';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(beginning|now)', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match) => {
  const date = match[1].toLowerCase();

  let start;
  let end;
  /* istanbul ignore else */
  if (date === 'beginning') {
    start = { year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0 };
  } else if (date === 'now') {
    const refDateStruct = dateStructFromDate(ref);
    const nowDateStruct = { ...refDateStruct, month: refDateStruct.month + 1 };
    start = nowDateStruct;
  }

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    index: match.index,
    start,
    end,
  });
};

export default parser;

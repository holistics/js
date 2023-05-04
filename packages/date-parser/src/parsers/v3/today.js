import Chrono from 'chrono-node';
import truncateDateStruct from '../../helpers/truncateDateStruct';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';
import luxonFromStruct from '../../helpers/luxonFromStruct';
import { ParsedResultExtra } from '../../helpers/ParsedResultExtra';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(today|yesterday|tomorrow)', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match, opt) => {
  const { luxonRefInTargetTz } = opt;

  const date = match[1].toLowerCase();
  let value = 0;
  if (date === 'yesterday') {
    value = -1;
  } else if (date === 'tomorrow') {
    value = 1;
  }

  const truncatedStruct = truncateDateStruct(dateStructFromLuxon(luxonRefInTargetTz), 'day', false);
  const truncatedLuxon = luxonFromStruct(truncatedStruct);

  const startLuxon = truncatedLuxon.plus({ days: value });
  const endLuxon = startLuxon.plus({ days: 1 });

  return new ParsedResultExtra({
    ref,
    text: match[0],
    index: match.index,
    tags: { todayParser: true },
    start: dateStructFromLuxon(startLuxon),
    end: dateStructFromLuxon(endLuxon),
  });
};

export default parser;

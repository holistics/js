import Chrono from 'chrono-node';
import truncateDateStruct from '../../helpers/truncateDateStruct';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';
import luxonFromStruct from '../../helpers/luxonFromStruct';
import toPluralLuxonUnit from '../../helpers/toPluralLuxonUnit';
import { ParsedResultExtra } from '../../helpers/ParsedResultExtra';

const parser = new Chrono.Parser();

parser.pattern = () => {
  /* eslint-disable-next-line max-len */
  return new RegExp('(exact(?:ly)? )?(\\d+) (year|month|week|day|hour|minute|second)s? (ago|from now)( for \\d+ (?:year|month|week|day|hour|minute|second)s?)?', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
parser.extract = (text, ref, match, opt) => {
  const exact = !!match[1];
  const dateUnit = match[3].toLowerCase();
  const isPast = match[4].toLowerCase() !== 'from now';
  const value = parseInt(match[2]) * (isPast ? -1 : 1);
  const duration = match[5];

  const { luxonRefInTargetTz } = opt;

  let refDateStruct = dateStructFromLuxon(luxonRefInTargetTz);

  if (!exact) {
    refDateStruct = truncateDateStruct(refDateStruct, dateUnit, false);
  }

  let startLuxon = luxonFromStruct(refDateStruct);
  const luxonUnits = toPluralLuxonUnit(dateUnit);
  startLuxon = startLuxon.plus({ [luxonUnits]: value });

  let endLuxon = startLuxon;

  if (duration) {
    const [durationValue, durationDateUnit] = duration.replace(' for ', '').split(' ');
    const durationUnits = toPluralLuxonUnit(durationDateUnit.toLowerCase());
    endLuxon = endLuxon.plus({ [durationUnits]: parseInt(durationValue) });
  } else if (exact) {
    endLuxon = endLuxon.plus({ seconds: 1 });
  } else {
    endLuxon = endLuxon.plus({ [luxonUnits]: 1 });
  }

  return new ParsedResultExtra({
    ref,
    text: match[0],
    tags: { xAgoParser: true },
    index: match.index,
    start: dateStructFromLuxon(startLuxon),
    end: dateStructFromLuxon(endLuxon),
  });
};

export default parser;

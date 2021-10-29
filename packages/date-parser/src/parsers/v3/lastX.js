import Chrono from 'chrono-node';
import truncateDateStruct from '../../helpers/truncateDateStruct';
import isTimeUnit from '../../helpers/isTimeUnit';
import pluralize from '../../helpers/pluralize';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';
import luxonFromStruct from '../../helpers/luxonFromStruct';
import toPluralLuxonUnit from '../../helpers/toPluralLuxonUnit';
import { startOfCustom, endOfCustom } from '../../helpers/startEndOfCustom';

const parser = new Chrono.Parser();

parser.pattern = () => {
  return new RegExp('(last|next|this|current)( \\d+)? (year|quarter|month|week|day|hour|minute|second)s?( (?:begin|end))?', 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 * @param {Object} opt
 */
parser.extract = (text, ref, match, opt) => {
  const { luxonRefInTargetTz, weekStartDay } = opt;

  const modifier = match[1].toLowerCase();
  const value = modifier === 'this' ? 0 : parseInt((match[2] || '1').trim());
  const dateUnit = match[3].toLowerCase();
  const pointOfTime = (match[4] || '').trim();

  const refDateStruct = truncateDateStruct(dateStructFromLuxon(luxonRefInTargetTz), dateUnit, false);

  let startLuxon = luxonFromStruct(refDateStruct);
  let endLuxon = startLuxon;

  // Set range according to past/future relativity
  const luxonUnits = toPluralLuxonUnit(dateUnit);
  if (modifier === 'last') {
    startLuxon = startLuxon.minus({ [luxonUnits]: value });
    endLuxon = endLuxon.minus({ [luxonUnits]: 1 });
  } else if (modifier === 'next') {
    endLuxon = endLuxon.plus({ [luxonUnits]: value });
    startLuxon = startLuxon.plus({ [luxonUnits]: 1 });
  }

  // Push start, end to start, end of time period
  startLuxon = startOfCustom(startLuxon, dateUnit, weekStartDay);
  endLuxon = endOfCustom(endLuxon, dateUnit, weekStartDay).plus({ seconds: 1 }).set({ millisecond: 0 });

  // Set to point of time if specified
  if (pointOfTime === 'begin') {
    endLuxon = isTimeUnit(dateUnit) ? startLuxon.plus({ seconds: 1 }) : startLuxon.plus({ days: 1 });
  } else if (pointOfTime === 'end') {
    startLuxon = isTimeUnit(dateUnit) ? endLuxon.minus({ seconds: 1 }) : endLuxon.minus({ days: 1 });
  }

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    // NOTE: just keeping normalized_text here for possible future UX improvement, it is not actually kept in Chrono.ParsedResult
    normalized_text: `${match[1]}${value ? match[2] : ''} ${pluralize(match[3], value || 1)}${match[4] || ''}`,
    index: match.index,
    tags: { lastXParser: true },
    start: dateStructFromLuxon(startLuxon),
    end: dateStructFromLuxon(endLuxon),
  });
};

export default parser;

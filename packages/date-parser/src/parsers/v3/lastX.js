import Chrono from 'chrono-node';
import truncateDateStruct from '../../helpers/truncateDateStruct';
import dateStructFromDate from '../../helpers/dateStructFromDate';
import momentFromStruct from '../../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../../helpers/chronoDateStructFromMoment';
import isTimeUnit from '../../helpers/isTimeUnit';
import pluralize from '../../helpers/pluralize';
import { shouldUseUTC, convertResultFromUtc, adjustRefdate } from '../../helpers/utcParsingHelpers';

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
  const { weekStartDay } = opt;
  const modifier = match[1].toLowerCase();
  const value = modifier === 'this' ? 0 : parseInt((match[2] || '1').trim());
  const dateUnit = match[3].toLowerCase();
  const pointOfTime = (match[4] || '').trim();

  const { timezone } = opt;
  const adjustedRef = adjustRefdate(ref, dateUnit, timezone);

  const refDateStruct = truncateDateStruct(dateStructFromDate(adjustedRef), dateUnit);
  let startMoment = momentFromStruct(refDateStruct, { weekStartDay });
  let endMoment = startMoment.clone();

  // Set range according to past/future relativity
  if (modifier === 'last') {
    startMoment = startMoment.subtract(value, dateUnit);
    endMoment = endMoment.subtract(1, dateUnit);
  } else if (modifier === 'next') {
    endMoment = endMoment.add(value, dateUnit);
    startMoment = startMoment.add(1, dateUnit);
  }

  // Push start, end to start, end of time period
  startMoment = startMoment.startOf(dateUnit);
  endMoment = endMoment.endOf(dateUnit).add(1, 'second').millisecond(0);

  // Set to point of time if specified
  if (pointOfTime === 'begin') {
    endMoment = startMoment.add(1, isTimeUnit(dateUnit) ? 'second' : 'day');
  } else if (pointOfTime === 'end') {
    startMoment = endMoment.subtract(1, isTimeUnit(dateUnit) ? 'second' : 'day');
  }

  let startStruct = chronoDateStructFromMoment(startMoment, timezone);
  let endStruct = chronoDateStructFromMoment(endMoment, timezone);

  if (shouldUseUTC(dateUnit) && timezone) {
    startStruct = convertResultFromUtc(startStruct, timezone);
    endStruct = convertResultFromUtc(endStruct, timezone);
  }

  return new Chrono.ParsedResult({
    ref,
    text: match[0],
    // NOTE: just keeping normalized_text here for possible future UX improvement, it is not actually kept in Chrono.ParsedResult
    normalized_text: `${match[1]}${value ? match[2] : ''} ${pluralize(match[3], value || 1)}${match[4] || ''}`,
    index: match.index,
    tags: { lastXParser: true },
    start: startStruct,
    end: endStruct,
  });
};

export default parser;

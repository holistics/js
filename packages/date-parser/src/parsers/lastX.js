import truncateDateStruct from '../helpers/truncateDateStruct';
import dateStructFromDate from '../helpers/dateStructFromDate';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import isTimeUnit from '../helpers/isTimeUnit';
import { DATE_UNIT_LEVELS } from '../constants';
import offsetTimezoneForJSDate from '../helpers/offsetTimezoneForJSDate';

const parser = {};

parser.pattern = () => {
  return new RegExp('(last|next|this)( \\d+)? (year|quarter|month|week|day|hour|minute|second)s?( (?:begin|end))?', 'i');
};

/**
 * @param {Chrono.ParsingContext} context
 * @param {Object} opt
 */
parser.extract = (context, match) => {
  const { weekStartDay } = context.option;
  const modifier = match[1];
  const value = modifier === 'this' ? 0 : parseInt((match[2] || '1').trim());
  const dateUnit = match[3].toLowerCase();
  const pointOfTime = (match[4] || '').trim();

  const shouldUseUTC = DATE_UNIT_LEVELS[dateUnit] >= DATE_UNIT_LEVELS.hour;

  let refDate = context.reference.instant;
  if (!shouldUseUTC) {
    refDate = offsetTimezoneForJSDate(refDate, context.option.timezone);
  }

  const refDateStruct = truncateDateStruct(dateStructFromDate(refDate), dateUnit);
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

  const chronoStart = chronoDateStructFromMoment(startMoment);
  const chronoEnd = chronoDateStructFromMoment(endMoment);

  if (shouldUseUTC) {
    chronoStart.timezoneOffset = 0;
    chronoEnd.timezoneOffset = 0;
  }

  return context.createParsingResult(
    match.index,
    match[0],
    chronoDateStructFromMoment(startMoment),
    chronoDateStructFromMoment(endMoment),
  );
};

export default parser;

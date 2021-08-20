import dateStructFromDate from '../helpers/dateStructFromDate';
import truncateDateStruct from '../helpers/truncateDateStruct';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import { WEEKDAYS_MAP } from '../constants';
import offsetTimezoneForJSDate from '../helpers/offsetTimezoneForJSDate';

const parser = {};

parser.pattern = () => {
  /* eslint-disable-next-line max-len */
  return new RegExp(`(${Object.keys(WEEKDAYS_MAP).join('|')}) (last|this|next)( \\d+)? weeks?`, 'i');
};

/**
 * @param {Chrono.ParsingContext} context
 * @param {Array} match
 */
parser.extract = (context, match) => {
  const { weekStartDay } = context.option;
  const weekday = match[1].toLowerCase();
  const modifier = match[2];
  let value;
  if (modifier === 'this') {
    value = 0;
  } else if (modifier === 'last') {
    value = parseInt(match[3] || 1) * -1;
  } else {
    value = parseInt(match[3] || 1);
  }

  const offsetRef = offsetTimezoneForJSDate(context.reference.instant, context.option.timezone);

  const refDateStruct = truncateDateStruct(dateStructFromDate(offsetRef), 'day');
  let startMoment = momentFromStruct(refDateStruct, { weekStartDay });
  startMoment = startMoment.add(value, 'week');
  startMoment = startMoment.weekday((7 + WEEKDAYS_MAP[weekday] - weekStartDay) % 7);

  const endMoment = startMoment.add(1, 'day');

  return context.createParsingResult(
    match.index,
    match[0],
    chronoDateStructFromMoment(startMoment),
    chronoDateStructFromMoment(endMoment),
  );
};

export default parser;

import dateStructFromDate from '../helpers/dateStructFromDate';
import momentFromStruct from '../helpers/momentFromStruct';
import chronoDateStructFromMoment from '../helpers/chronoDateStructFromMoment';
import truncateDateStruct from '../helpers/truncateDateStruct';
import offsetTimezoneForJSDate from '../helpers/offsetTimezoneForJSDate';

const parser = {};

parser.pattern = () => {
  return new RegExp('(today|yesterday|tomorrow)', 'i');
};

/**
 * @param {Chrono.ParsingContext} context
 * @param {Array} match
 */
parser.extract = (context, match) => {
  const date = match[1].toLowerCase();
  let value = 0;
  if (date === 'yesterday') {
    value = -1;
  } else if (date === 'tomorrow') {
    value = 1;
  }

  const offsetRef = offsetTimezoneForJSDate(context.reference.instant, context.option.timezone);

  const refDateStruct = truncateDateStruct(dateStructFromDate(offsetRef), 'day');
  let startMoment = momentFromStruct(refDateStruct, { weekStartDay: context.option.weekStartDay });
  startMoment = startMoment.add(value, 'day');

  const endMoment = startMoment.add(1, 'day');

  return context.createParsingResult(
    match.index,
    match[0],
    chronoDateStructFromMoment(startMoment),
    chronoDateStructFromMoment(endMoment),
  );
};

export default parser;

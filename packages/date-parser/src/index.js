import ChronoNode from 'chrono-node';
import Moment from 'moment';
import _flatten from 'lodash/flatten';

import options from './options';
import isValidDate from './helpers/isValidDate';

const chrono = new ChronoNode.Chrono(options);

export const parse = (str, ref, { raw = false, timezoneOffset = 0 } = {}) => {
  const refDate = new Date(ref);
  if (!isValidDate(refDate)) throw new Error('Invalid reference date');

  // Adjust refDate by timezoneOffset
  const refMoment = Moment.utc(refDate);
  refMoment.add(timezoneOffset, 'minute');
  const refDateAdjustedByTz = refMoment.toDate();

  let parts = str.split(' - ');
  const isRange = parts.length === 2;
  if (!isRange) parts = [str];

  const parsedResults = _flatten(parts.map(part => chrono.parse(part, refDateAdjustedByTz, { timezoneOffset })));

  if (raw) return parsedResults;

  const first = parsedResults[0];
  if (!first) return null;

  const last = parsedResults[parsedResults.length - 1];

  const result = new ChronoNode.ParsedResult({
    ref: refDate,
    index: first.index,
    tags: { ...first.tags, ...last.tags },
    text: isRange ? `${first.text} - ${last.text}` : first.text,
  });
  result.start = first.start.clone();
  result.end = isRange ? last.start.clone() : first.end.clone();
  return result;
};

export default {
  parse,
};

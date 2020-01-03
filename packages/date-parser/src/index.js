import ChronoNode from 'chrono-node';
import _flatten from 'lodash/flatten';

import constantsParser from './parsers/constants';
import todayParser from './parsers/today';
import xAgoParser from './parsers/xAgo';
import lastXParser from './parsers/lastX';

import implier from './refiners/implier';

const chrono = new ChronoNode.Chrono(ChronoNode.options.strictOption());

const defaultParsers = chrono.parsers;
chrono.parsers = [
  constantsParser,
  todayParser,
  xAgoParser,
  lastXParser,
  ...defaultParsers,
];

chrono.refiners.push(implier);

export const parse = (str, ref) => {
  let parts = str.split(' - ');
  const isRange = parts.length === 2;
  if (!isRange) parts = [str];

  const parsedResults = _flatten(parts.map(part => chrono.parse(part, ref, { singleTimePoint: isRange })));

  const first = parsedResults[0];
  if (!first) return null;

  const last = parsedResults[parsedResults.length - 1];

  const result = new ChronoNode.ParsedResult({
    ref,
    index: first.index,
    text: isRange ? `${first.text} - ${last.text}` : first.text,
  });
  result.start = first.start.clone();
  result.end = isRange ? last.start.clone() : first.end.clone();
  return result;
};

export default {
  parse,
};

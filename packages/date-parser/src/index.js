import ChronoNode from 'chrono-node';

import xAgoParser from './parsers/xAgo';
import lastXParser from './parsers/lastX';

const chrono = new ChronoNode.Chrono(ChronoNode.options.strictOption());
const defaultParsers = chrono.parsers;
chrono.parsers = [
  xAgoParser,
  lastXParser,
  ...defaultParsers,
];

export default (str, ref) => chrono.parse(str, ref);

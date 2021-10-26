import ChronoNode from 'chrono-node';

import ambiguousWeekdayGuard from './parsers/guards/ambiguousWeekday';

import constantsParser from './parsers/v3/constants';
import todayParser from './parsers/v3/today';
import weekdayParser from './parsers/v3/weekday';
import yearParser from './parsers/year';
import xAgoParser from './parsers/v3/xAgo';
import lastXParser from './parsers/v3/lastX';
import wrapChronoISOParser from './parsers/wrapChronoISOParser'; // TODO: move to v3

import implier from './refiners/v3/implier';
import timezoneRefiner from './refiners/v3/timezone';
import ambiguityRefiner from './refiners/ambiguity';

const { parser, refiner } = ChronoNode;
const parserConfig = { strict: true };

export default {
  parsers: [
    ambiguousWeekdayGuard,

    constantsParser,
    todayParser,
    yearParser,
    weekdayParser,
    xAgoParser,
    lastXParser,

    wrapChronoISOParser(parserConfig),
    new parser.ENDeadlineFormatParser(parserConfig),
    new parser.ENMonthNameLittleEndianParser(parserConfig),
    new parser.ENMonthNameMiddleEndianParser(parserConfig),
    new parser.ENMonthNameParser(parserConfig),
    new parser.ENSlashDateFormatParser(parserConfig),
    new parser.ENSlashDateFormatStartWithYearParser(parserConfig),
    new parser.ENSlashMonthFormatParser(parserConfig),
    new parser.ENTimeExpressionParser(parserConfig),
  ],
  refiners: [
    new refiner.OverlapRemovalRefiner(),
    new refiner.ForwardDateRefiner(),

    // English
    new refiner.ENMergeDateTimeRefiner(),
    new refiner.ENMergeDateRangeRefiner(),
    new refiner.ENPrioritizeSpecificDateRefiner(),

    timezoneRefiner,
    implier,
    ambiguityRefiner,
  ],
};

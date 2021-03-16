import ChronoNode from 'chrono-node';

import ambiguousWeekdayGuard from './parsers/guards/ambiguousWeekday';

import constantsParser from './parsers/constants';
import todayParser from './parsers/today';
import yearParser from './parsers/year';
import weekdayParser from './parsers/weekday';
import xAgoParser from './parsers/xAgo';
import lastXParser from './parsers/lastX';

import implier from './refiners/implier';
import timezoneRefiner from './refiners/timezone';
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

    new parser.ENISOFormatParser(parserConfig),
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

import ChronoNode from 'chrono-node';

// Common parsers & refiners for both V1 and V3
import ambiguousWeekdayGuard from './parsers/guards/ambiguousWeekday';
import yearParser from './parsers/year';
import ambiguityRefiner from './refiners/ambiguity';

import constantsParser from './parsers/v3/constants';
import todayParser from './parsers/v3/today';
import weekdayParser from './parsers/v3/weekday';
import xAgoParser from './parsers/v3/xAgo';
import lastXParser from './parsers/v3/lastX';
import wrapChronoISOParser from './parsers/v3/wrapChronoISOParser';

import implier from './refiners/v3/implier';
import timezoneRefiner from './refiners/v3/timezone';

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

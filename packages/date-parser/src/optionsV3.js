import ChronoNode from 'chrono-node';

// Common parsers & refiners for both V1 and V3
import ambiguousWeekdayGuard from './parsers/guards/ambiguousWeekday';
import yearParser from './parsers/year';
import yearMonthParser from './parsers/yearMonth';
import ambiguityRefiner from './refiners/ambiguity';

import constantsParser from './parsers/v3/constants';
import todayParser from './parsers/v3/today';
import weekdayParser from './parsers/v3/weekday';
import xAgoParser from './parsers/v3/xAgo';
import lastXParser from './parsers/v3/lastX';

import implier from './refiners/v3/implier';
import timezoneRefiner from './refiners/v3/timezone';

import { wrapAbsoluteChronoParser, wrapRelativeChronoParser } from './parsers/v3/wrapChronoParser';

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
    yearMonthParser,

    wrapAbsoluteChronoParser(parser.ENISOFormatParser, parserConfig),
    wrapRelativeChronoParser(parser.ENDeadlineFormatParser, parserConfig),
    wrapAbsoluteChronoParser(parser.ENMonthNameLittleEndianParser, parserConfig),
    wrapAbsoluteChronoParser(parser.ENMonthNameMiddleEndianParser, parserConfig),
    wrapAbsoluteChronoParser(parser.ENMonthNameParser, parserConfig),
    wrapAbsoluteChronoParser(parser.ENSlashDateFormatParser, parserConfig),
    wrapAbsoluteChronoParser(parser.ENSlashDateFormatStartWithYearParser, parserConfig),
    wrapAbsoluteChronoParser(parser.ENSlashMonthFormatParser, parserConfig),
    wrapRelativeChronoParser(parser.ENTimeExpressionParser, parserConfig),
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

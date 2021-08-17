// Chrono parsers
import ISOFormatParser from 'chrono-node/dist/common/parsers/ISOFormatParser';
import SlashDateFormatParser from 'chrono-node/dist/common/parsers/SlashDateFormatParser';
import ENMonthNameLittleEndianParser from 'chrono-node/dist/locales/en/parsers/ENMonthNameLittleEndianParser';
import ENMonthNameMiddleEndianParser from 'chrono-node/dist/locales/en/parsers/ENMonthNameMiddleEndianParser';
import ENCasualYearMonthDayParser from 'chrono-node/dist/locales/en/parsers/ENCasualYearMonthDayParser';
import ENSlashMonthFormatParser from 'chrono-node/dist/locales/en/parsers/ENSlashMonthFormatParser';
import ENTimeExpressionParser from 'chrono-node/dist/locales/en/parsers/ENTimeExpressionParser';
import ENMonthNameParser from 'chrono-node/dist/locales/en/parsers/ENMonthNameParser';

// Chrono refiners
import OverlapRemovalRefiner from 'chrono-node/dist/common/refiners/OverlapRemovalRefiner';
import ForwardDateRefiner from 'chrono-node/dist/common/refiners/ForwardDateRefiner';
import ENMergeDateTimeRefiner from 'chrono-node/dist/locales/en/refiners/ENMergeDateTimeRefiner';
import ENMergeDateRangeRefiner from 'chrono-node/dist/locales/en/refiners/ENMergeDateRangeRefiner';


// Custom parsers
import ambiguousWeekdayGuard from './parsers/guards/ambiguousWeekday';
import constantsParser from './parsers/constants';
import todayParser from './parsers/today';
import yearParser from './parsers/year';
import weekdayParser from './parsers/weekday';
import xAgoParser from './parsers/xAgo';
import lastXParser from './parsers/lastX';

// Custom refiners
import implier from './refiners/implier';
import timezone from './refiners/timezone';

const littleEndian = false;
const strictMode = true;

const parsers = [
  ambiguousWeekdayGuard,

  constantsParser,
  todayParser,
  yearParser,
  weekdayParser,
  xAgoParser,
  lastXParser,

  new ISOFormatParser(),
  new SlashDateFormatParser(littleEndian),
  new ENMonthNameLittleEndianParser(),
  new ENMonthNameMiddleEndianParser(),
  new ENCasualYearMonthDayParser(),
  new ENSlashMonthFormatParser(),
  new ENTimeExpressionParser(strictMode),
  new ENMonthNameParser(),
];

const refiners = [
  new OverlapRemovalRefiner(),

  new ENMergeDateTimeRefiner(),
  new ENMergeDateRangeRefiner(),

  new OverlapRemovalRefiner(),
  new ForwardDateRefiner(),

  implier,
  timezone,
];

// https://github.com/wanasit/chrono/blob/b6140ec17996fec84c790891ecbfd8b7d44fbb5b/src/configurations.ts
export default {
  parsers,
  refiners,
};

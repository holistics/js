import ChronoNode from 'chrono-node';

const { parser, refiner } = ChronoNode;
const parserConfig = { strict: true };

export default {
  parsers: [
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
  ],
};

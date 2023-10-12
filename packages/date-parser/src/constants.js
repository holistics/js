export const DATE_UNIT_LEVELS = {
  year: 0,
  month: 1,
  week: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6,
};

export const WEEKDAYS = {
  Sunday: 'sunday',
  Monday: 'monday',
  Tuesday: 'tuesday',
  Wednesday: 'wednesday',
  Thursday: 'thursday',
  Friday: 'friday',
  Saturday: 'saturday',
};

export const WEEKDAYS_MAP = {
  sun: 0,
  [WEEKDAYS.Sunday]: 0,
  mon: 1,
  [WEEKDAYS.Monday]: 1,
  tue: 2,
  [WEEKDAYS.Tuesday]: 2,
  wed: 3,
  [WEEKDAYS.Wednesday]: 3,
  thu: 4,
  [WEEKDAYS.Thursday]: 4,
  fri: 5,
  [WEEKDAYS.Friday]: 5,
  sat: 6,
  [WEEKDAYS.Saturday]: 6,
};

/**
 * @enum {String}
 */
export const OUTPUT_TYPES = {
  // v1 only
  parsed_component: 'parsed_component', // deprecated in v3

  // v1 and v3
  // Note these behavior changes in v3
  //
  // * timestamp: v1 returns UTC, while in v3 it returns the timestamp with correct timezone offset
  //     E.g. v1: 2021-12-01 16:00:00Z, v3: 2021-12-02 00:00:00+08:00
  //
  // * date: same as v3
  //
  // * raw: v1 returns Chrono Parsed component, v3 returns the `Result` class itself
  //
  date: 'date',
  timestamp: 'timestamp',
  raw: 'raw',

  // v3 only
  timestamp_utc: 'timestamp_utc',
  luxon: 'luxon',
};

export const DATE_RANGE_KEYWORDS = {
  rangeEndInclusive: ['-', 'to'],
  rangeEndExclusive: ['till', 'until'],
};

export const DATE_RANGE_PATTERNS = {
  rangeEndInclusive: new RegExp(`(.+) (${DATE_RANGE_KEYWORDS.rangeEndInclusive.join('|')}) (.+)`, 'i'),
  rangeEndExclusive: new RegExp(`(.+) (${DATE_RANGE_KEYWORDS.rangeEndExclusive.join('|')}) (.+)`, 'i'),
};

export const PARSER_VERSION_1 = 1;
export const PARSER_VERSION_3 = 3;
export const DATE_STRING_CHARACTER_LIMIT = 200;

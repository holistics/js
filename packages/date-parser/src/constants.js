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
  parsed_component: 'parsed_component', // deprecated in v2

  // v1 and v2
  // Note these behavior changes in v2
  //
  // * timestamp: v1 returns UTC, while in v2 it returns the timestamp with correct timezone offset
  //     E.g. v1: 2021-12-01 16:00:00Z, v2: 2021-12-02 00:00:00+08:00
  //
  // * date: same as v2
  //
  // * raw: v1 returns Chrono Parsed component, v2 returns the `Result` class itself
  //
  date: 'date',
  timestamp: 'timestamp',
  raw: 'raw',

  // v2 only
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

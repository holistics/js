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
  parsed_component: 'parsed_component',
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

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
  mon: 0,
  monday: 0,
  tue: 1,
  tuesday: 1,
  wed: 2,
  wednesday: 2,
  thu: 3,
  thursday: 3,
  fri: 4,
  friday: 4,
  sat: 5,
  saturday: 5,
  sun: 6,
  sunday: 6,
};

/**
 * @enum {String}
 */
export const OUTPUT_TYPES = {
  parsed_component: 'parsed_component',
  date: 'date',
  timestamp: 'timestamp',
  raw: 'raw',
};

export const DATE_RANGE_PATTERNS = {
  rangeEndInclusive: /(.+) (-) (.+)/i,
  rangeEndExclusive: /(.+) (to|till|until) (.+)/i,
};

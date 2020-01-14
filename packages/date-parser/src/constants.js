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
  mon: 1,
  monday: 1,
  tue: 2,
  tuesday: 2,
  wed: 3,
  wednesday: 3,
  thu: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
  sun: 7,
  sunday: 7,
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

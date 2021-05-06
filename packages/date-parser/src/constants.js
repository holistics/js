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

export const WSD_REMAPPING = {
  sun: 0,
  sunday: 0,
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

export const DATE_RANGE_KEYWORDS = {
  rangeEndInclusive: ['-', 'to'],
  rangeEndExclusive: ['till', 'until'],
};

export const DATE_RANGE_PATTERNS = {
  rangeEndInclusive: new RegExp(`(.+) (${DATE_RANGE_KEYWORDS.rangeEndInclusive.join('|')}) (.+)`, 'i'),
  rangeEndExclusive: new RegExp(`(.+) (${DATE_RANGE_KEYWORDS.rangeEndExclusive.join('|')}) (.+)`, 'i'),
};

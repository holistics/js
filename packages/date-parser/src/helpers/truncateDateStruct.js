import _pick from 'lodash/pick';

const DATE_PARTS_FOR_DATE_UNIT = {
  year: ['year'],
  quarter: ['year', 'month'],
  month: ['year', 'month'],
  week: ['year', 'month', 'day'],
  day: ['year', 'month', 'day'],
  hour: ['year', 'month', 'day', 'hour'],
  minute: ['year', 'month', 'day', 'hour', 'minute'],
  second: ['year', 'month', 'day', 'hour', 'minute', 'second'],
};

// monthStartAtZero:
// - v1 uses dayjs which starts at 0
// - v3 uses luxon which starts at 1
export default (dateStruct, dateUnit, monthStartAtZero = true) => {
  return {
    year: 1,
    month: monthStartAtZero ? 0 : 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    ..._pick(dateStruct, DATE_PARTS_FOR_DATE_UNIT[dateUnit]),
    timezone: dateStruct.timezone,
  };
};

import _pick from 'lodash/pick';

const DATE_PARTS_FOR_DATE_UNIT = {
  year: ['year'],
  month: ['year', 'month'],
  week: ['year', 'month', 'day'],
  day: ['year', 'month', 'day'],
  hour: ['year', 'month', 'day', 'hour'],
  minute: ['year', 'month', 'day', 'hour', 'minute'],
  second: ['year', 'month', 'day', 'hour', 'minute', 'second'],
};

export default (dateStruct, dateUnit) => {
  return {
    year: 1,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    ..._pick(dateStruct, DATE_PARTS_FOR_DATE_UNIT[dateUnit]),
  };
};

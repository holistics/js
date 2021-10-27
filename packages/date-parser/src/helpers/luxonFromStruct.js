import { DateTime } from 'luxon';

export default ({
  year, month, day, hour, minute, second, millisecond, timezone,
}) => {
  return DateTime.fromObject({
    year,
    month, // luxon's month starts at 1, same as our date struct
    day,
    hour,
    minute,
    second,
    millisecond,
  }, {
    zone: timezone,
  });
};

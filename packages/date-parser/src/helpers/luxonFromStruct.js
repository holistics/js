import { DateTime } from 'luxon';
import { ParseError } from '../errors';

export default ({
  year, month, day, hour, minute, second, millisecond, timezone,
}) => {
  const datetime = DateTime.fromObject({
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

  if (!datetime.isValid) {
    throw new ParseError(`${datetime.invalidReason}: ${datetime.invalidExplanation}`);
  }

  return datetime;
};

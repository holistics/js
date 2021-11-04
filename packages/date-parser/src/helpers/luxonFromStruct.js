import { DateTime } from 'luxon';
import { ParseError } from '../errors';

export default ({
  year, month, day, hour, minute, second, millisecond, timezone,
}) => {
  const datetime = DateTime.utc(
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  );

  if (!datetime.isValid) {
    throw new ParseError(`${datetime.invalidReason}: ${datetime.invalidExplanation}`);
  }

  return datetime.setZone(timezone, { keepLocalTime: true });
};

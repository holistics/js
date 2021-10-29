import { DateTime } from 'luxon';
import { ParseError } from '../errors';

/**
 *
 * @param {Chrono.ParsedComponents} chronoStruct
 * @returns {Luxon.DateTime}
 */
const luxonFromChronoStruct = (chronoStruct) => {
  const datetime = DateTime.fromObject({
    year: chronoStruct.get('year'),
    month: chronoStruct.get('month'),
    day: chronoStruct.get('day'),
    hour: chronoStruct.get('hour'),
    minute: chronoStruct.get('minute'),
    second: chronoStruct.get('second'),
    millisecond: chronoStruct.get('millisecond'),
  }, {
    zone: chronoStruct.get('timezone'),
  });

  if (!datetime.isValid) {
    throw new ParseError(`${datetime.invalidReason}: ${datetime.invalidExplanation}`);
  }

  return datetime;
};

export default luxonFromChronoStruct;

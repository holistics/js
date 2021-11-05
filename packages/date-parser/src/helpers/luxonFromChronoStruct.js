import luxonFromStruct from './luxonFromStruct';

/**
 *
 * @param {Chrono.ParsedComponents} chronoStruct
 * @returns {Luxon.DateTime}
 */
const luxonFromChronoStruct = (chronoStruct) => {
  return luxonFromStruct({
    year: chronoStruct.get('year'),
    month: chronoStruct.get('month'),
    day: chronoStruct.get('day'),
    hour: chronoStruct.get('hour'),
    minute: chronoStruct.get('minute'),
    second: chronoStruct.get('second'),
    millisecond: chronoStruct.get('millisecond'),
    timezone: chronoStruct.get('timezone'),
  });
};

export default luxonFromChronoStruct;

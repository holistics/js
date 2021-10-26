import Chrono from 'chrono-node';

/**
 *
 * @param {Chrono.ParsedComponents} parsedComponent
 */
const implyTimezoneOffset = (parsedComponent, timezoneOffset) => {
  parsedComponent.imply('timezoneOffset', (timezoneOffset || 0));
};

const implyTimezoneRegion = (parsedComponent, timezone) => {
  if (!parsedComponent.get('timezone')) {
    parsedComponent.imply('timezone', timezone);
  }
};

const timezoneRefiner = new Chrono.Refiner();
timezoneRefiner.refine = (text, results, { timezoneOffset, timezone }) => {
  /**
   *
   * @param {Chrono.ParsedResult} res
   */
  return results.map(res => {
    if (timezone) {
      implyTimezoneRegion(res.start, timezone);
      if (res.end) implyTimezoneRegion(res.end, timezone);
    } else {
      implyTimezoneOffset(res.start, timezoneOffset);
      if (res.end) implyTimezoneOffset(res.end, timezoneOffset);
    }

    return res;
  });
};

export default timezoneRefiner;

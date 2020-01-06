import Chrono from 'chrono-node';

/**
 *
 * @param {Chrono.ParsedComponents} parsedComponent
 */
const implyTimezone = (parsedComponent, timezoneOffset) => {
  parsedComponent.imply('timezoneOffset', (timezoneOffset || 0));
};

const timezoneRefiner = new Chrono.Refiner();
timezoneRefiner.refine = (text, results, { timezoneOffset }) => {
  /**
   *
   * @param {Chrono.ParsedResult} res
   */
  return results.map(res => {
    implyTimezone(res.start, timezoneOffset);
    implyTimezone(res.end, timezoneOffset);
    return res;
  });
};

export default timezoneRefiner;

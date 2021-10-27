import Chrono from 'chrono-node';

const implyTimezoneRegion = (parsedComponent, timezone) => {
  if (!parsedComponent.get('timezone')) {
    parsedComponent.imply('timezone', timezone);
  }
};

const timezoneRefiner = new Chrono.Refiner();
timezoneRefiner.refine = (text, results, { timezone }) => {
  /**
   *
   * @param {Chrono.ParsedResult} res
   */
  return results.map(res => {
    implyTimezoneRegion(res.start, timezone);
    if (res.end) implyTimezoneRegion(res.end, timezone);

    return res;
  });
};

export default timezoneRefiner;

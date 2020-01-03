import Chrono from 'chrono-node';
import getHighestLevelDateUnit from '../helpers/getHighestLevelDateUnit';

/**
 *
 * @param {Chrono.ParsedComponents} parsedComponent
 */
const implyDefaults = (parsedComponent) => {
  parsedComponent.imply('hour', 0);
  parsedComponent.imply('timezoneOffset', 0);
};

/**
 *
 * @param {Chrono.ParsedComponents} start
 * @param {Boolean} singleTimePoint
 */
const implyEnd = (start, singleTimePoint) => {
  const end = start.clone();
  end.impliedValues = {
    ...end.impliedValues,
    ...end.knownValues,
  };
  end.knownValues = {};
  if (singleTimePoint) return end;

  // increment the highest-level known date unit
  const incrementedUnit = getHighestLevelDateUnit(start.knownValues);
  end.imply(incrementedUnit, start.get(incrementedUnit) + 1);
  return end;
};

/**
 *
 * @param {Chrono.ParsedResult} res
 */
const implyResult = (res, { singleTimePoint }) => {
  implyDefaults(res.start);
  if (res.end) {
    implyDefaults(res.end);
  } else {
    res.end = implyEnd(res.start, singleTimePoint);
  }
  return res;
};

const implier = new Chrono.Refiner();
implier.refine = (text, results, opts) => {
  /**
   *
   * @param {Chrono.ParsedResult} res
   */
  return results.map(res => implyResult(res, opts));
};

export default implier;

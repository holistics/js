import Chrono from 'chrono-node';
import getHighestLevelDateUnit from '../helpers/getHighestLevelDateUnit';
import luxonFromChronoStruct from '../helpers/luxonFromChronoStruct';
import dateStructFromLuxon from '../helpers/dateStructFromLuxon';

/**
 *
 * @param {Chrono.ParsedComponents} parsedComponent
 */
const implyDefaults = (parsedComponent) => {
  parsedComponent.imply('hour', 0);
  parsedComponent.imply('minute', 0);
  parsedComponent.imply('second', 0);
};

/**
 *
 * @param {Chrono.ParsedComponents} start
 * @param {Boolean} singleTimePoint
 */
const implyEnd = (start) => {
  const end = start.clone();
  end.impliedValues = {
    ...end.impliedValues,
    ...end.knownValues,
  };
  end.knownValues = {};

  // increment the highest-level known date unit
  const incrementedUnit = getHighestLevelDateUnit(start.knownValues);
  end.imply(incrementedUnit, start.get(incrementedUnit) + 1);
  return end;
};

/**
 * The above imply may create invalid dates because it simply increse the highest level 1 unit
 * This new imply for version 2 would build a proper Luxon datetime then increase on that datetime
 *
 * @param {Chorno.ParsedComponents} start
 * @returns Chrono.ParsedComponent
 */
const implyWithCorrectness = (start) => {
  const end = start.clone();
  end.impliedValues = {
    ...end.impliedValues,
    ...end.knownValues,
  };
  end.knownValues = {};

  // increment the highest-level known date unit
  const incrementedUnit = getHighestLevelDateUnit(start.knownValues) || 'millisecond';
  const incremental = {};
  incremental[`${incrementedUnit}s`] = 1; // days, months, years...
  const luxonInstance = luxonFromChronoStruct(end).plus(incremental);
  end.impliedValues = dateStructFromLuxon(luxonInstance);

  return end;
};

/**
 *
 * @param {Chrono.ParsedResult} res
 */
const implyResult = (res, opt) => {
  implyDefaults(res.start);
  if (res.end) {
    implyDefaults(res.end);
  } else {
    res.end = opt.parserVersion === 2 ? implyWithCorrectness(res.start) : implyEnd(res.start);
  }
  return res;
};

const implier = new Chrono.Refiner();
implier.refine = (text, results, opt) => {
  /**
   *
   * @param {Chrono.ParsedResult} res
   */
  return results.map(res => implyResult(res, opt));
};

export default implier;

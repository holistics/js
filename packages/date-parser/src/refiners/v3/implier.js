import Chrono from 'chrono-node';
import getHighestLevelDateUnit from '../../helpers/getHighestLevelDateUnit';
import luxonFromChronoStruct from '../../helpers/luxonFromChronoStruct';
import dateStructFromLuxon from '../../helpers/dateStructFromLuxon';

/**
 *
 * @param {Chrono.ParsedComponents} parsedComponent
 * Chrono set the hour at 12:00 by default, the imply here set it back to 00:00
 */
const implyDefaults = (parsedComponent) => {
  parsedComponent.imply('hour', 0);
  parsedComponent.imply('minute', 0);
  parsedComponent.imply('second', 0);
};

/**
 * @param {Chorno.ParsedComponents} start
 * @returns Chrono.ParsedComponent
 */
const implyWithLuxon = (start) => {
  const end = start.clone();

  // increment the highest-level known date unit
  const incrementedUnit = getHighestLevelDateUnit(start.knownValues) || 'millisecond';
  const incremental = {};
  incremental[`${incrementedUnit}s`] = 1; // days, months, years...
  const luxonInstance = luxonFromChronoStruct(start).plus(incremental);

  end.impliedValues = dateStructFromLuxon(luxonInstance);
  end.knownValues = {};

  return end;
};

/**
 *
 * @param {Chrono.ParsedResult} res
 */
const implyResult = (res) => {
  implyDefaults(res.start);
  if (res.end) {
    implyDefaults(res.end);
  } else {
    res.end = implyWithLuxon(res.start);
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

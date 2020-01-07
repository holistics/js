import Chrono from 'chrono-node';
import _isEmpty from 'lodash/isEmpty';
import _compact from 'lodash/compact';

/**
 *
 * @param {Chrono.ParsedResult} parsedResult
 */
const isAmbiguous = (parsedResult) => {
  return _isEmpty(parsedResult.start.knownValues);
};

const ambiguityRefiner = new Chrono.Refiner();
ambiguityRefiner.refine = (text, results) => {
  /**
   *
   * @param {Chrono.ParsedResult} res
   */
  return _compact(results.map(res => {
    return isAmbiguous(res) ? null : res;
  }));
};

export default ambiguityRefiner;

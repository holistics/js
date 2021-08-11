import _isEmpty from 'lodash/isEmpty';
import _compact from 'lodash/compact';

/**
 *
 * @param {Chrono.ParsedResult} parsedResult
 */
const isAmbiguous = (parsedResult) => {
  return _isEmpty(parsedResult.start.knownValues);
};

const ambiguityRefiner = {};

/**
 * @param {Chrono.ParsingContext} context
 * @param {Chrono.ParsedResult[]} results
 * @return {Chrono.ParsedResult[]}
 */
ambiguityRefiner.refine = (context, results) => {
  return _compact(results.map(res => {
    return isAmbiguous(res) ? null : res;
  }));
};

export default ambiguityRefiner;

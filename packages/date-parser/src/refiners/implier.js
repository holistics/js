import getHighestLevelDateUnit from '../helpers/getHighestLevelDateUnit';

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
 *
 * @param {Chrono.ParsedResult} res
 */
const implyResult = (res) => {
  implyDefaults(res.start);
  if (res.end) {
    implyDefaults(res.end);
  } else {
    res.end = implyEnd(res.start);
  }
  return res;
};

const implier = {};
/**
 * @param {ParsingContext} context
 * @param {ParsedResult[]} results
 * @return {ParsedResult[]}
 */
implier.refine = (context, results) => {
  return results.map(res => implyResult(res));
};

export default implier;

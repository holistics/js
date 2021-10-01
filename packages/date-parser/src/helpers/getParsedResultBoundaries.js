import _some from 'lodash/some';

/**
 * Sort the Chrono parsed results
 *
 * @param {Chrono.ParsedResult} parsedResults
 */
const getParsedResultBoundaries = (parsedResults) => {
  const sortedResults = parsedResults.slice().sort((a, b) => {
    if (a.end.moment().isBefore(b.start.moment())) return -1;
    if (a.start.moment().isAfter(b.end.moment())) return 1;
    return 0;
  });
  const hasOrderChanged = _some(sortedResults, (r, i) => parsedResults[i] !== r);
  const first = sortedResults[0];
  const last = sortedResults[sortedResults.length - 1];
  return { first, last, hasOrderChanged };
};

export default getParsedResultBoundaries;

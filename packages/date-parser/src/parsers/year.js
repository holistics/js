const parser = {};

parser.pattern = () => {
  return new RegExp('(\\d\\d\\d\\d)');
};

/**
 * @param {Chrono.ParsingContext} context
 * @param {Array} match
 */
parser.extract = (context, match) => {
  const year = parseInt(match[1]);
  const month = 1;
  const day = 1;

  return context.createParsingResult(
    match.index,
    match[0],
    { year, month, day },
    { year: year + 1, month, day },
  );
};

export default parser;

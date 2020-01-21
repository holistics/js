const dateParser = require('../../dist/date-parser.cjs.js');

const serializeParsedResult = (parsedResult) => {
  if (!parsedResult) return null;
  return {
    text: parsedResult.text,
    ref: parsedResult.ref.toISOString(),
    start: parsedResult.start.constructor === String ? parsedResult.start : parsedResult.start.date().toISOString(),
    end: parsedResult.end.constructor === String ? parsedResult.end : parsedResult.end.date().toISOString(),
  };
};

module.exports = (argv) => {
  const { text, ref, options = {} } = argv;
  const parsedResult = dateParser.parse(text, ref, options);
  return serializeParsedResult(parsedResult);
};

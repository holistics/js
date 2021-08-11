import dateStructFromDate from '../helpers/dateStructFromDate';

const parser = {};

parser.pattern = () => {
  return new RegExp('(beginning|now)', 'i');
};

/**
 * @param {Chrono.ParsingContext} context
 * @param {Array} match
 */
parser.extract = (context, match) => {
  const date = match[1].toLowerCase();

  let start;
  let end;
  /* istanbul ignore else */
  if (date === 'beginning') {
    start = {
      year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
    };
  } else if (date === 'now') {
    const refDateStruct = dateStructFromDate(context.reference.instant);
    const nowDateStruct = { ...refDateStruct, month: refDateStruct.month + 1 };
    start = nowDateStruct;
  }

  return context.createParsingResult(
    match.index,
    match[0],
    start,
    end,
  );
};

export default parser;

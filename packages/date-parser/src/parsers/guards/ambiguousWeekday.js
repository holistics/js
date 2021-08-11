import { WEEKDAYS_MAP } from '../../constants';
import { ParseError } from '../../errors';

const guard = {};

guard.pattern = () => {
  return new RegExp(`^\\s*((?:last|this|next) )?(${Object.keys(WEEKDAYS_MAP).join('|')})\\s*$`, 'i');
};

/**
 * @param {ParsingContext} context
 * @param {Array} match
 */
guard.extract = (context, match) => {
  const modifier = (match[1] || 'last/this/next').trim();
  const weekday = match[2];
  throw new ParseError(`"${match[0]}" is ambiguous. Please try "${weekday} ${modifier} week" instead`);
};

export default guard;

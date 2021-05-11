import Chrono from 'chrono-node';
import { WEEKDAYS_MAP } from '../../constants';
import { ParseError } from '../../errors';

const guard = new Chrono.Parser();

guard.pattern = () => {
  return new RegExp(`^\\s*((?:last|this|next) )?(${Object.keys(WEEKDAYS_MAP).join('|')})\\s*$`, 'i');
};

/**
 * @param {String} text
 * @param {Date} ref
 * @param {Array} match
 */
guard.extract = (text, ref, match) => {
  const modifier = (match[1] || 'last/this/next').trim();
  const weekday = match[2];
  throw new ParseError(`"${match[0]}" is ambiguous. Please try "${weekday} ${modifier} week" instead`);
};

export default guard;

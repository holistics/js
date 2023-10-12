import { DATE_STRING_CHARACTER_LIMIT } from '../constants';

/**
 * @param {String} str A date string
 * @return {Boolean}
 */
const exceedLimit = (str) => {
  return str.length > DATE_STRING_CHARACTER_LIMIT;
};

export default exceedLimit;

import { DATE_UNIT_LEVELS } from '../constants';

export default (dateUnit) => {
  return DATE_UNIT_LEVELS[dateUnit] > DATE_UNIT_LEVELS.day;
};

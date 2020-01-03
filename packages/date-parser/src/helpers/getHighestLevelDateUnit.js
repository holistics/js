import _forOwn from 'lodash/forOwn';
import { DATE_UNIT_LEVELS } from '../constants';

export default (dateStruct) => {
  let highestLevel = -1;
  let highestLevelDateUnit;
  _forOwn(DATE_UNIT_LEVELS, (level, dateUnit) => {
    if (dateUnit in dateStruct) {
      /* istanbul ignore else */
      if (level > highestLevel) {
        highestLevel = level;
        highestLevelDateUnit = dateUnit;
      }
    }
  });
  return highestLevelDateUnit;
};

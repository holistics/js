import {
  DATE_RANGE_PATTERNS,
} from '../constants';

const splitInputStr = (str) => {
  let parts = [str];
  let isRangeEndInclusive = true;
  let rangeSeparator;
  let matches;

  if (str.match(DATE_RANGE_PATTERNS.rangeEndInclusive)) {
    matches = str.match(DATE_RANGE_PATTERNS.rangeEndInclusive);
    isRangeEndInclusive = true;
  } else if (str.match(DATE_RANGE_PATTERNS.rangeEndExclusive)) {
    matches = str.match(DATE_RANGE_PATTERNS.rangeEndExclusive);
    isRangeEndInclusive = false;
  }

  if (matches) {
    rangeSeparator = matches[2];
    parts = [matches[1], matches[3]];
  }

  return {
    isRange: !!rangeSeparator,
    parts,
    rangeSeparator,
    isRangeEndInclusive,
  };
};

export default splitInputStr;

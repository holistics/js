import Result from './result';
import { WEEKDAYS } from './index';


describe('Result tests', () => {
  it('work with null result', () => {
    const result = new Result({
      ref: null,
      index: -1,
      text: '',
      start: null,
      end: null,
      weekStartDay: WEEKDAYS.Monday,
    });

    result.asDate();
    result.asTimestamp();
    result.asTimestampUtc();
    result.asLuxon();
  });
});

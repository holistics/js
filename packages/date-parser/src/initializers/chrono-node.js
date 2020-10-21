import dayjs from 'dayjs';
import { ParsedComponents } from 'chrono-node';

const overrideDayjs = () => {
  // Monkey-patch the dayjs function so that:
  // * the result dayjs object has the plugins that we need (see `./dayjs`).
  // * the utcOffset of the result is set according to timezoneOffset
  ParsedComponents.prototype.dayjs = function () {
    let result = dayjs();

    result = result.year(this.get('year'));
    result = result.month(this.get('month') - 1);
    result = result.date(this.get('day'));
    result = result.hour(this.get('hour'));
    result = result.minute(this.get('minute'));
    result = result.second(this.get('second'));
    result = result.millisecond(this.get('millisecond'));

    // Javascript Date Object return minus timezone offset
    const currentTimezoneOffset = result.utcOffset();
    const targetTimezoneOffset = this.get('timezoneOffset') !== undefined ? this.get('timezoneOffset') : currentTimezoneOffset;

    const adjustTimezoneOffset = targetTimezoneOffset - currentTimezoneOffset;
    result = result.add(-adjustTimezoneOffset, 'minute');
    /* BEGIN MONKEY PATCH */
    result = result.utcOffset(targetTimezoneOffset); // without this, the result would have timezone offset of the process
    /* END MONKEY PATCH */

    return result;
  };
};

overrideDayjs();

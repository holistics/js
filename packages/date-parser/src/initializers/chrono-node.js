import { ParsedComponents } from 'chrono-node';

const overrideDayjs = () => {
  const origDayjs = ParsedComponents.prototype.dayjs;
  ParsedComponents.prototype.dayjs = function () {
    let result = origDayjs.call(this);
    if (this.get('timezoneOffset') !== undefined) {
      result = result.utcOffset(this.get('timezoneOffset'));
    }
    return result;
  };
};

overrideDayjs();

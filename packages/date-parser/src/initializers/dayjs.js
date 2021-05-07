import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import utcPlugin from 'dayjs/plugin/utc';
import weekdayPlugin from 'dayjs/plugin/weekday';
import quarterOfYearPlugin from 'dayjs/plugin/quarterOfYear';

// https://github.com/iamkun/dayjs/issues/215#issuecomment-471280396
// note that this makes weekday(0) -> monday
dayjs.locale({
  ...en,
});
dayjs.extend(weekdayPlugin);
dayjs.extend(utcPlugin);
dayjs.extend(quarterOfYearPlugin);

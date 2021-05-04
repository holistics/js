import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import weekdayPlugin from 'dayjs/plugin/weekday';
import quarterOfYearPlugin from 'dayjs/plugin/quarterOfYear';

// https://github.com/iamkun/dayjs/issues/215#issuecomment-471280396
// note that this makes weekday(0) -> monday
dayjs.extend(weekdayPlugin);
dayjs.extend(utcPlugin);
dayjs.extend(quarterOfYearPlugin);

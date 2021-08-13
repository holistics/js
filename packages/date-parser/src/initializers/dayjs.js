import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import utcPlugin from 'dayjs/plugin/utc';
import weekdayPlugin from 'dayjs/plugin/weekday';
import quarterOfYearPlugin from 'dayjs/plugin/quarterOfYear';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale({
  ...en,
});
dayjs.extend(weekdayPlugin);
dayjs.extend(utcPlugin);
dayjs.extend(timezone);
dayjs.extend(quarterOfYearPlugin);

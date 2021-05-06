import dayjs from 'dayjs';
import en from 'dayjs/locale/en';

export default ({
  year, month, day, hour, minute, second,
}, weekStartDate = 1) => {
  dayjs().locale({
    ...en,
    weekStart: weekStartDate,
  });
  return dayjs.utc()
    .year(year)
    .month(month)
    .date(day)
    .hour(hour)
    .minute(minute)
    .second(second);
};

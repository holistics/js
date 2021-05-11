import dayjs from 'dayjs';
import en from 'dayjs/locale/en';

export default ({
  year, month, day, hour, minute, second,
}, {
  weekStartDate,
}) => {
  /* eslint-disable-next-line no-param-reassign */
  weekStartDate = parseInt(weekStartDate);
  if (Number.isNaN(weekStartDate) || weekStartDate < 0 || weekStartDate > 6) {
    throw new Error(`Invalid weekStartDate index: ${weekStartDate}`);
  }

  return dayjs.utc()
    .year(year)
    .month(month)
    .date(day)
    .hour(hour)
    .minute(minute)
    .second(second)
    .locale({
      ...en,
      weekStart: weekStartDate,
    });
};

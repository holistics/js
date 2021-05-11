import dayjs from 'dayjs';
import en from 'dayjs/locale/en';

export default ({
  year, month, day, hour, minute, second,
}, {
  weekStartDay,
}) => {
  /* eslint-disable-next-line no-param-reassign */
  weekStartDay = parseInt(weekStartDay);
  if (Number.isNaN(weekStartDay) || weekStartDay < 0 || weekStartDay > 6) {
    throw new Error(`Invalid weekStartDay index: ${weekStartDay}`);
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
      weekStart: weekStartDay,
    });
};

import dayjs from 'dayjs';

export default ({ year, month, day, hour, minute, second }) => {
  return dayjs.utc()
    .year(year)
    .month(month)
    .date(day)
    .hour(hour)
    .minute(minute)
    .second(second);
};

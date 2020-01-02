/**
 *
 * @param {Moment.Moment} moment
 */
export default (moment) => {
  return {
    year: moment.get('year'),
    month: moment.get('month') + 1,
    day: moment.get('date'),
    hour: moment.get('hour'),
    minute: moment.get('minute'),
    second: moment.get('second'),
  };
};

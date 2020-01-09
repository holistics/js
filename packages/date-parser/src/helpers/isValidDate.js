// https://stackoverflow.com/a/1353711
export default (date) => {
  return date instanceof Date
    /* eslint-disable-next-line no-restricted-properties */
    && !global.isNaN(date);
};

// https://stackoverflow.com/a/1353711
export default (date) => {
  return date instanceof Date
    && !Number.isNaN(Number(date));
};

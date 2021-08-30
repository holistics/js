// export default (text: string, itemsOrCount: number | Array<any>): string => {
export default (text, count) => {
  // const count = itemsOrCount.constructor === Array ? itemsOrCount.length : itemsOrCount;
  if (count === 1) return text;
  return `${text.replace(/y$/, 'ie').replace(/s$/, 'se')}s`;
};

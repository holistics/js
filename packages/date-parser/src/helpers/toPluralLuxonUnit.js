const toPluralLuxonUnit = (unit) => {
  if (unit[unit.length - 1] === 's') return unit;
  return `${unit}s`;
};

export default toPluralLuxonUnit;

const weekdayIdxFromLuxon = (luxon) => {
  const idx = luxon.weekday;
  return idx === 7 ? 0 : idx; // our Sunday is 0, while Luxon is 7
};

export default weekdayIdxFromLuxon;

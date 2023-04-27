import Chrono from 'chrono-node';

export class ParsedResultExtra {
  constructor (result) {
    this.ref = result.ref;
    this.index = result.index;
    this.text = result.text;
    this.tags = result.tags || {};
    this.metadata = result.metadata || {};

    this.start = new Chrono.ParsedComponents(result.start, result.ref);
    if (result.end) {
      this.end = new Chrono.ParsedComponents(result.end, result.ref);
    }
  }

  clone () {
    const result = new ParsedResultExtra(this);
    result.tags = JSON.parse(JSON.stringify(this.tags));
    result.start = this.start.clone();
    if (this.end) {
      result.end = this.end.clone();
    }

    return result;
  }

  date () {
    return this.start.date();
  }

  hasPossibleDates () {
    return this.start.isPossibleDate() && (!this.end || this.end.isPossibleDate());
  }

  isOnlyWeekday () {
    return this.start.isOnlyWeekdayComponent();
  }

  isOnlyDayMonth () {
    return this.start.isOnlyDayMonthComponent();
  }
}

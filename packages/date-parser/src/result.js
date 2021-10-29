import { merge } from 'lodash';
import luxonFromChronoStruct from './helpers/luxonFromChronoStruct';

export default class Result {
  /**
   * @param {Date} ref
   * @param {Number} index
   * @param {String} text
   * @param {Chrono.ParsingComponents} start
   * @param {Chrono.ParsingComponents} end
   * @param {String} weekStartDay
   */
  constructor ({
    ref, index, text, start, end, weekStartDay,
  }) {
    this.ref = ref;
    this.index = index;
    this.text = text;
    this.start = start;
    this.end = end;
    this.weekStartDay = weekStartDay;
  }

  toObject () {
    return {
      ref: this.ref,
      index: this.index,
      text: this.text,
      start: this.start,
      end: this.end,
      weekStartDay: this.weekStartDay,
    };
  }

  asLuxon () {
    return merge(
      this.toObject(), {
        start: this.start ? luxonFromChronoStruct(this.start) : null,
        end: this.end ? luxonFromChronoStruct(this.end) : null,
      },
    );
  }

  // Note that the luxon instance contains the original timezone
  // The date here is formatted from that instance, so it's still implicit in that timezone
  asDate () {
    const luxonResult = this.asLuxon();
    return merge(
      luxonResult, {
        start: luxonResult.start ? luxonResult.start.toFormat('yyyy-MM-dd') : null,
        end: luxonResult.end ? luxonResult.end.toFormat('yyyy-MM-dd') : null,
      },
    );
  }

  // Convert the timezone to UTC then return the values, hence,
  // the original timezone offset is lost
  asTimestampUtc () {
    const luxonResult = this.asLuxon();
    return merge(
      luxonResult, {
        start: luxonResult.start ? luxonResult.start.setZone('Etc/UTC').toISO() : null,
        end: luxonResult.end ? luxonResult.end.setZone('Etc/UTC').toISO() : null,
      },
    );
  }

  // This reserves the timezone offset
  // E.g. 2017-04-20T11:32:00.000-04:00
  asTimestamp () {
    const luxonResult = this.asLuxon();
    return merge(
      luxonResult, {
        start: luxonResult.start ? luxonResult.start.toISO() : null,
        end: luxonResult.end ? luxonResult.end.toISO() : null,
      },
    );
  }
}

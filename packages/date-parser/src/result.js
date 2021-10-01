import { DateTime } from 'luxon';
import { merge } from 'lodash';

const toLuxon = (chronoResult) => {
  return DateTime.fromObject({
    year: chronoResult.get('year'),
    month: chronoResult.get('month'),
    day: chronoResult.get('day'),
    hour: chronoResult.get('hour'),
    minute: chronoResult.get('minute'),
    second: chronoResult.get('second'),
    millisecond: chronoResult.get('millisecond'),
  }, {
    zone: chronoResult.get('timezone'),
  });
};

export default class Result {
  /**
   * @param {Date} ref
   * @param {Number} index
   * @param {String} text
   * @param {Chrono.ParsingComponents} start
   * @param {Chrono.ParsingComponents} end
   * @param {String} timezone
   */
  constructor ({
    ref, index, text, start, end,
  }) {
    this.ref = ref;
    this.index = index;
    this.text = text;
    this.start = start;
    this.end = end;
  }

  toObject () {
    return {
      ref: this.ref,
      index: this.index,
      text: this.text,
      start: this.start,
      end: this.end,
    };
  }

  asLuxon () {
    return merge(
      this.toObject(), {
        start: this.start ? toLuxon(this.start) : null,
        end: this.end ? toLuxon(this.end) : null,
      },
    );
  }

  // Note that the luxon instance contains the original timezone
  // The date here is formatted from that instance, so it's still implicit in that timezone
  asDate () {
    const luxonResult = this.asLuxon();
    return merge(
      luxonResult, {
        start: luxonResult.start ? luxonResult.start.toFormat('YYYY-MM-DD') : null,
        end: luxonResult.end ? luxonResult.end.toFormat('YYYY-MM-DD') : null,
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

  // This reserves the timezone offset, but still losing the timezone region
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

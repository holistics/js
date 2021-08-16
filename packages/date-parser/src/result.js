import dayjs from 'dayjs';
import { merge } from 'lodash';

/**
   *
   * @param {Date} date
   * @param {String} timezone
   */
const toDayJS = (date, timezone) => {
  return dayjs(date).tz(timezone);
};
export default class PostResult {
  /**
   * @param {Date} ref
   * @param {Number} index
   * @param {String} text
   * @param {Chrono.ParsingComponents} start
   * @param {Chrono.ParsingComponents} end
   * @param {String} timezone
   */
  constructor ({
    ref, index, text, start, end, timezone,
  }) {
    this.ref = ref;
    this.index = index;
    this.text = text;
    this.start = start;
    this.end = end;
    this.timezone = timezone;
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

  asChronoType () {
    return this.toObject();
  }

  asDayJsType () {
    return merge(
      this.toObject(), {
        start: this.start ? toDayJS(this.start.date(), this.timezone) : null,
        end: this.end ? toDayJS(this.end.date(), this.timezone) : null,
      },
    );
  }

  asDateType () {
    const dayJsResult = this.asDayJsType();
    return merge(
      dayJsResult, {
        start: dayJsResult.start ? dayJsResult.start.format('YYYY-MM-DD') : null,
        end: dayJsResult.end ? dayJsResult.end.format('YYYY-MM-DD') : null,
      },
    );
  }

  asTimestampType () {
    const dayJsResult = this.asDayJsType();
    return merge(
      dayJsResult, {
        start: dayJsResult.start ? dayJsResult.start.toISOString() : null,
        end: dayJsResult.end ? dayJsResult.end.toISOString() : null,
      },
    );
  }
}

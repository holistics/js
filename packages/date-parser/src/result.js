import { merge } from 'lodash';

const convertToTargetTimezone = (parsedComponent) => {
  if (!parsedComponent) return null;
  const offset = parsedComponent.get('timezoneOffset');

  return parsedComponent.dayjs().utcOffset(offset);
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

  asChronoType () {
    return this.toObject();
  }

  asDateType () {
    const start = convertToTargetTimezone(this.start);
    const end = convertToTargetTimezone(this.end);

    return merge(
      this.toObject(), {
        start: start ? start.format('YYYY-MM-DD') : null,
        end: end ? end.format('YYYY-MM-DD') : null,
      },
    );
  }

  asTimestampType () {
    const start = this.start ? this.start.dayjs().toISOString() : null;
    const end = this.end ? this.end.dayjs().toISOString() : null;

    return merge(
      this.toObject(), { start, end },
    );
  }
}

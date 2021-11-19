import {
  parse, WEEKDAYS,
} from './index';
import { parse as parseV3 } from './dateParserV3';
import { PARSER_VERSION_3 } from './constants';

describe('Parsing logic', () => {
  const defaultOpts = { parserVersion: PARSER_VERSION_3, output: 'raw' };

  it('works with lastX format', () => {
    let res;

    res = parse('last week', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-16T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-23T00:00:00.000+00:00');

    res = parse('this week', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-23T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-30T00:00:00.000+00:00');

    res = parse('last month', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-11-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-01T00:00:00.000+00:00');

    res = parse('last quarter', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-07-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-10-01T00:00:00.000+00:00');

    res = parse('last year', new Date('2020-02-29T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-01T00:00:00.000+00:00');

    res = parse('this month begin', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-02T00:00:00.000+00:00');

    res = parse('current month begin', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-02T00:00:00.000+00:00');

    res = parse('last month end', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-11-30T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-01T00:00:00.000+00:00');

    res = parse('last 2 month', new Date('2019-02-09T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2018-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-02-01T00:00:00.000+00:00');

    // plural date unit
    res = parse('last 2 months', new Date('2019-02-09T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2018-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-02-01T00:00:00.000+00:00');

    // uppercase chars
    res = parse('LAST 2 mOnth', new Date('2019-02-09T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2018-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-02-01T00:00:00.000+00:00');

    res = parse('last 2 months begin', new Date('2019-02-09T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2018-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2018-12-02T00:00:00.000+00:00');

    res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-24T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-26T00:00:00.000+00:00');

    res = parse('last 2 hours begin', new Date('2019-12-26T01:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-25T23:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-25T23:00:01.000+00:00');

    res = parse('next 2 minutes end', new Date('2019-12-26T01:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-26T01:16:59.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-26T01:17:00.000+00:00');

    // New tests with tz

    res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestamp().start).toEqual('2019-12-23T00:00:00.000-06:00');
    expect(res.asTimestamp().end).toEqual('2019-12-25T00:00:00.000-06:00');

    res = parse('last 1 day', new Date('2021-03-29T01:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-28T00:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-29T00:00:00.000+02:00');

    res = parse('last 3 hours', new Date('2021-03-28T01:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-27T23:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-28T03:00:00.000+02:00');

    res = parse('last 180 minutes', new Date('2021-03-28T01:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-27T23:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-28T03:00:00.000+02:00');
  });

  it('works with xAgo format', () => {
    let res;

    res = parse('2 days ago', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-24T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-25T00:00:00.000+00:00');

    res = parse('exact 2 days ago', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-24T02:14:05.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-24T02:14:06.000+00:00');

    res = parse('3 weeks from now', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2020-01-16T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-23T00:00:00.000+00:00');

    res = parse('exactly 3 weeks from now', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2020-01-16T02:14:05.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-16T02:14:06.000+00:00');

    res = parse('1 year ago', new Date('2020-02-29T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-01T00:00:00.000+00:00');

    res = parse('exactly 1 year ago', new Date('2020-02-29T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-02-28T02:14:05.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-02-28T02:14:06.000+00:00');

    res = parse('1 year ago for 5 days', new Date('2020-02-29T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-01-06T00:00:00.000+00:00');

    res = parse('exactly 1 year ago for 5 days', new Date('2020-02-29T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-02-28T02:14:05.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-03-05T02:14:05.000+00:00');

    // New tests with tz

    res = parse('2 days ago', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestamp().start).toEqual('2019-12-23T00:00:00.000-06:00');
    expect(res.asTimestamp().end).toEqual('2019-12-24T00:00:00.000-06:00');

    res = parse('1 year ago for 5 days', new Date('2020-02-29T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestamp().start).toEqual('2019-01-01T00:00:00.000-06:00');
    expect(res.asTimestamp().end).toEqual('2019-01-06T00:00:00.000-06:00');

    res = parse('3 hours ago', new Date('2021-03-28T01:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-27T23:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-28T00:00:00.000+01:00');

    res = parse('180 minutes ago', new Date('2021-03-28T01:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-27T23:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-27T23:01:00.000+01:00');

    res = parse('exact 3 hours ago', new Date('2021-03-28T01:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-27T23:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-27T23:00:01.000+01:00');

    res = parse('1 day ago', new Date('2021-03-29T01:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-28T00:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-29T00:00:00.000+02:00');

    res = parse('1 day ago', new Date('2021-03-28T01:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-27T00:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-28T00:00:00.000+01:00');
  });

  it('works with absolute, both full and partial, dates', () => {
    let res;

    res = parse('2019-12-01', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-02T00:00:00.000+00:00');

    res = parse('2019-11-30', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-11-30T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-01T00:00:00.000+00:00');

    res = parse('2019-12-01T09:15:32Z', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-01T09:15:32.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-01T09:15:33.000+00:00');

    res = parse('19:15:32', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-26T19:15:32.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-26T19:15:33.000+00:00');

    res = parse('15:32', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-26T15:32:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-26T15:33:00.000+00:00');

    res = parse('30:32', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res).toEqual(null);

    res = parse('June 2019', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-06-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-07-01T00:00:00.000+00:00');

    res = parse('2019', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-01T00:00:00.000+00:00');

    // New tests with tz

    res = parse('2019', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestamp().start).toEqual('2019-01-01T00:00:00.000-06:00');
    expect(res.asTimestamp().end).toEqual('2020-01-01T00:00:00.000-06:00');

    res = parse('2019-12-01T09:15:32Z till 2019-12-02T09:15:40Z', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestampUtc().start).toEqual('2019-12-01T09:15:32.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-02T09:15:40.000+00:00');

    res = parse('2019-12-01T09:15:32+09:00', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestamp().start).toEqual('2019-11-30T18:15:32.000-06:00');
    expect(res.asTimestamp().end).toEqual('2019-11-30T18:15:33.000-06:00');
  });

  it('works with today format', () => {
    let res;

    res = parse('today', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-31T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-01T00:00:00.000+00:00');

    res = parse('tomorrow', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2020-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-02T00:00:00.000+00:00');

    res = parse('yesterday', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-30T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-31T00:00:00.000+00:00');

    // New tests with tz
    res = parse('today', new Date('2019-12-31T18:00:00Z'), { ...defaultOpts, timezoneRegion: 'Asia/Singapore' });
    expect(res.asTimestamp().start).toEqual('2020-01-01T00:00:00.000+08:00');
    expect(res.asTimestamp().end).toEqual('2020-01-02T00:00:00.000+08:00');

    res = parse('tomorrow', new Date('2021-10-30T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-10-31T00:00:00.000+02:00');
    expect(res.asTimestamp().end).toEqual('2021-11-01T00:00:00.000+01:00');

    res = parse('yesterday', new Date('2021-03-15T06:00:00Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestamp().start).toEqual('2021-03-14T00:00:00.000-06:00');
    expect(res.asTimestamp().end).toEqual('2021-03-15T00:00:00.000-05:00');
  });

  it('can parse constants', () => {
    let res;

    res = parse('beginning', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('1970-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('1970-01-01T00:00:01.000+00:00');

    res = parse('now', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-31T02:14:05.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-31T02:14:06.000+00:00');

    // New tests with tz
    res = parse('now', new Date('2019-12-31T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'Asia/Singapore' });
    expect(res.asTimestamp().start).toEqual('2019-12-31T10:14:05.000+08:00');
    expect(res.asTimestamp().end).toEqual('2019-12-31T10:14:06.000+08:00');

    res = parse('now', new Date('2019-12-31T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2019-12-31T03:14:05.000+01:00');
    expect(res.asTimestamp().end).toEqual('2019-12-31T03:14:06.000+01:00');
  });

  it('works with end-inclusive range', () => {
    let res;

    res = parse('beginning - now', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('1970-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-31T02:14:06.000+00:00');

    res = parse('beginning - 3 days ago', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('1970-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-29T00:00:00.000+00:00');

    // auto reorder range
    res = parse('3 days ago - beginning', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('1970-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-29T00:00:00.000+00:00');

    res = parse('beginning to 3 days ago', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('1970-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-29T00:00:00.000+00:00');
  });

  it('works with end-exclusive range', () => {
    let res;

    res = parse('beginning until now', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('1970-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-31T02:14:05.000+00:00');

    res = parse('beginning till 3 days ago', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('1970-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-28T00:00:00.000+00:00');

    res = parse('beginning until 3 days ago', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('1970-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-28T00:00:00.000+00:00');

    // raises error when start > end
    expect(() => parse('tomorrow till 3 days ago', new Date())).toThrowError(/must be before/i);

    // New timezone test

    res = parse('2019-12-28T09:00:00.000+00:00 until 2019-12-28T10:00:00.000+00:00', new Date('2021-03-16T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'Africa/Blantyre' });
    expect(res.asTimestampUtc().start).toEqual('2019-12-28T09:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-28T10:00:00.000+00:00');
  });

  it('keeps order when date range boundaries overlaps', () => {
    let res;

    res = parse('this week - yesterday', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-30T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-31T00:00:00.000+00:00');

    res = parse('yesterday - this week', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-30T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-06T00:00:00.000+00:00');
  });

  it('discards invalid range, keeps the valid part only', () => {
    let res;

    res = parse('yesterday-today', new Date('2018-06-25T05:00:00+08:00'), { ...defaultOpts, timezoneRegion: 'Africa/Blantyre' });
    expect(res.text).toEqual('yesterday');
    expect(res.asLuxon().start.toFormat('yyyy/MM/dd')).toEqual('2018/06/23');
    expect(res.asLuxon().end.toFormat('yyyy/MM/dd')).toEqual('2018/06/24');

    res = parse('yesterday till asd', new Date('2018-06-25T05:00:00+08:00'), { ...defaultOpts, timezoneRegion: 'Africa/Blantyre' });
    expect(res.text).toEqual('yesterday');
    expect(res.asLuxon().start.toFormat('yyyy/MM/dd')).toEqual('2018/06/23');
    expect(res.asLuxon().end.toFormat('yyyy/MM/dd')).toEqual('2018/06/24');

    res = parse('ahihi till yesterday', new Date('2018-06-25T05:00:00+08:00'), { ...defaultOpts, timezoneRegion: 'Africa/Blantyre' });
    expect(res.text).toEqual('yesterday');
    expect(res.asLuxon().start.toFormat('yyyy/MM/dd')).toEqual('2018/06/23');
    expect(res.asLuxon().end.toFormat('yyyy/MM/dd')).toEqual('2018/06/24');
  });

  it('can parse weekdays', () => {
    let res;

    res = parse('thursday this week', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-26T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-27T00:00:00.000+00:00');

    // uppercase chars
    res = parse('thuRsday tHis Week', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-26T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-27T00:00:00.000+00:00');

    res = parse('thursday current week', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-26T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-27T00:00:00.000+00:00');

    res = parse('tue last week', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-17T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-18T00:00:00.000+00:00');

    res = parse('wed next 2 weeks', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2020-01-08T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-09T00:00:00.000+00:00');

    res = parse('friday next weeks', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2020-01-03T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-04T00:00:00.000+00:00');

    // New tests with tz
    res = parse('sunday this week', new Date('2021-11-08T05:00:00Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestamp().start).toEqual('2021-11-07T00:00:00.000-05:00');
    expect(res.asTimestamp().end).toEqual('2021-11-08T00:00:00.000-06:00');

    res = parse('sunday last week', new Date('2021-03-28T22:00:00Z'), { ...defaultOpts, timezoneRegion: 'Europe/Copenhagen' });
    expect(res.asTimestamp().start).toEqual('2021-03-28T00:00:00.000+01:00');
    expect(res.asTimestamp().end).toEqual('2021-03-29T00:00:00.000+02:00');
  });

  it('works with weekStartDay', () => {
    let res;

    res = parse('last week', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Wednesday });
    expect(res.asTimestampUtc().start).toEqual('2019-12-18T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-25T00:00:00.000+00:00');

    res = parse('last 2 weeks', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Wednesday });
    expect(res.asTimestampUtc().start).toEqual('2019-12-11T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-25T00:00:00.000+00:00');

    res = parse('2 weeks from now', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Wednesday });
    expect(res.asTimestampUtc().start).toEqual('2020-01-09T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-16T00:00:00.000+00:00');

    res = parse('this week', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Wednesday });
    expect(res.asTimestampUtc().start).toEqual('2019-12-25T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-01T00:00:00.000+00:00');

    // This test to make sure the WSD does not effect last month
    res = parse('last 2 month', new Date('2019-02-09T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Wednesday });
    expect(res.asTimestampUtc().start).toEqual('2018-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-02-01T00:00:00.000+00:00');

    // This test to make sure the WSD does not effect the last year
    res = parse('last year', new Date('2020-02-29T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Wednesday });
    expect(res.asTimestampUtc().start).toEqual('2019-01-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-01T00:00:00.000+00:00');

    res = parse('tue last week', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Wednesday });
    expect(res.asTimestampUtc().start).toEqual('2019-12-24T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-25T00:00:00.000+00:00');

    res = parse('tue next 2 weeks', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Wednesday });
    expect(res.asTimestampUtc().start).toEqual('2020-01-14T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-15T00:00:00.000+00:00');

    res = parse('mon next week', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Sunday });
    expect(res.asTimestampUtc().start).toEqual('2019-12-30T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-31T00:00:00.000+00:00');

    res = parse('sat next week', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Sunday });
    expect(res.asTimestampUtc().start).toEqual('2020-01-04T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-05T00:00:00.000+00:00');

    res = parse('sat next week', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Saturday });
    expect(res.asTimestampUtc().start).toEqual('2019-12-28T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-29T00:00:00.000+00:00');

    res = parse('thu next week', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Thursday });
    expect(res.asTimestampUtc().start).toEqual('2020-01-02T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2020-01-03T00:00:00.000+00:00');

    res = parse('thu last week', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Friday });
    expect(res.asTimestampUtc().start).toEqual('2019-12-19T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-20T00:00:00.000+00:00');

    res = parse('last week begin', new Date('2021-05-10T22:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Tuesday });
    expect(res.asTimestampUtc().start).toEqual('2021-04-27T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2021-04-28T00:00:00.000+00:00');

    res = parse('last week end', new Date('2021-05-10T22:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Tuesday });
    expect(res.asTimestampUtc().start).toEqual('2021-05-03T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2021-05-04T00:00:00.000+00:00');

    res = parse('last week end', new Date('2021-05-12T03:14:05Z'), { ...defaultOpts, weekStartDay: WEEKDAYS.Tuesday, timezoneRegion: 'America/Chicago' });
    expect(res.asTimestamp().start).toEqual('2021-05-10T00:00:00.000-05:00');
    expect(res.asTimestamp().end).toEqual('2021-05-11T00:00:00.000-05:00');
  });

  it('has good behavior with default parsers', () => {
    let res = null;

    // ambiguous
    res = parse('within 3 days', new Date('2019-12-26T04:35:19+08:00'), { ...defaultOpts, timezoneRegion: 'Asia/Seoul' });
    expect(res).toEqual(null);

    res = parse('1 August 2021', new Date('2021-11-16 00:00:00+00:00'), { ...defaultOpts, timezoneRegion: 'Asia/Seoul', output: 'timestamp' });
    expect(res.start).toEqual('2021-08-01T00:00:00.000+09:00');
    expect(res.end).toEqual('2021-08-02T00:00:00.000+09:00');
  });

  it('rejects invalid reference date', () => {
    expect(() => parse('today', 'ahehe')).toThrowError(/invalid ref/i);
  });

  it('rejects invalid timezone region', () => {
    expect(() => parse('today', new Date(), { ...defaultOpts, timezoneRegion: 'asd' })).toThrowError(/invalid timezone region/i);
  });

  it('detect ambiguous input and raise informative error', () => {
    expect(() => parse('this mon', new Date(), defaultOpts)).toThrowError(/ambiguous.*mon this week/i);
    expect(() => parse('last monday', new Date(), defaultOpts)).toThrowError(/ambiguous.*monday last week/i);
    expect(() => parse('next Friday', new Date(), defaultOpts)).toThrowError(/ambiguous.*Friday next week/);
    expect(() => parse('thursday', new Date(), defaultOpts)).toThrowError(/ambiguous.*thursday last\/this\/next week/);
  });

  it('raises error when weekStartDay is invalid', () => {
    expect(() => parse('this mon', new Date(), { ...defaultOpts, weekStartDay: 'ahihi' })).toThrowError(/invalid weekStartDay/i);
  });

  it('should throw error when order is invalid', () => {
    expect(() => {
      parse('2021-10-01 till 2021-09-10', new Date(), defaultOpts);
    }).toThrow(/start date must be before end date/i);
  });

  it('rejects invalid reference date', () => {
    expect(() => parse('today', 'ahehe', defaultOpts)).toThrowError(/invalid ref/i);
  });

  it('default inputs should work', () => {
    const res = parseV3('last 2 days', new Date('2019-12-26T02:14:05Z'));
    expect(res.start).toEqual('2019-12-24T00:00:00.000+00:00');
    expect(res.end).toEqual('2019-12-26T00:00:00.000+00:00');
  });

  it('invalid text', () => {
    parse('meomeo', new Date(), { ...defaultOpts, timezoneRegion: 'Asia/Singapore' });
    parse('last', new Date(), { ...defaultOpts, output: 'timestamp', timezoneRegion: 'Asia/Singapore' });
  });

  it('reject when parsing invalid ISO date', () => {
    expect(() => parse('2019-02-29T09:15:32+09:00', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' })).toThrowError(/unit out of range/i);
  });
});

describe('output types', () => {
  const defaultOpts = { parserVersion: PARSER_VERSION_3 };

  it('support common output types', () => {
    let res;

    res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, output: 'date', timezoneRegion: 'America/Chicago' });
    expect(res.start).toEqual('2019-12-23');
    expect(res.end).toEqual('2019-12-25');

    res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, output: 'timestamp', timezoneRegion: 'America/Chicago' });
    expect(res.start).toEqual('2019-12-23T00:00:00.000-06:00');
    expect(res.end).toEqual('2019-12-25T00:00:00.000-06:00');

    res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, output: 'timestamp_utc', timezoneRegion: 'America/Chicago' });
    expect(res.start).toEqual('2019-12-23T06:00:00.000+00:00');
    expect(res.end).toEqual('2019-12-25T06:00:00.000+00:00');

    res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, output: 'luxon', timezoneRegion: 'America/Chicago' });
    expect(res.start.toISO()).toEqual('2019-12-23T00:00:00.000-06:00');

    res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { ...defaultOpts, timezoneRegion: 'America/Chicago' });
    expect(res.start).toEqual('2019-12-23T00:00:00.000-06:00');
  });
});

describe('system timezone affected cases', () => {
  const defaultOpts = { parserVersion: PARSER_VERSION_3, output: 'raw' };

  it("should work even when run with TZ='Europe/Berlin'", () => {
    let res;

    res = parse('2019/12/01', new Date('2019-12-26T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-01T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-02T00:00:00.000+00:00');

    res = parse('3 days ago till 15:36', new Date('2019-12-31T02:14:05Z'), defaultOpts);
    expect(res.asTimestampUtc().start).toEqual('2019-12-28T00:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-31T15:36:00.000+00:00');

    res = parse('3 o\'clock - 3 minutes ago', new Date('2019-12-26T04:35:19+08:00'), { ...defaultOpts, timezoneRegion: 'Asia/Seoul' });
    expect(res.text).toEqual("3 o'clock - 3 minutes ago");
    expect(res.asTimestampUtc().start).toEqual('2019-12-25T18:00:00.000+00:00');
    expect(res.asTimestampUtc().end).toEqual('2019-12-25T20:33:00.000+00:00');

    expect(res.asTimestamp().start).toEqual('2019-12-26T03:00:00.000+09:00');
    expect(res.asTimestamp().end).toEqual('2019-12-26T05:33:00.000+09:00');
  });
});

import { parse, OUTPUT_TYPES, Errors } from './index';

describe('dateParser', () => {
  it('works with lastX format', () => {
    let res;

    res = parse('last week', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 16, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 23, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-16T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-23T00:00:00.000Z');

    res = parse('this week', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 23, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 30, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-23T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-30T00:00:00.000Z');

    res = parse('last month', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 11, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-11-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-01T00:00:00.000Z');

    res = parse('last year', new Date('2020-02-29T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-01T00:00:00.000Z');

    res = parse('this month begin', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 2, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-02T00:00:00.000Z');

    res = parse('last month end', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 11, day: 30, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-11-30T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-01T00:00:00.000Z');

    res = parse('last 2 month', new Date('2019-02-09T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2018, month: 12, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 2, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2018-12-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-02-01T00:00:00.000Z');

    res = parse('last 2 months', new Date('2019-02-09T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2018, month: 12, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 2, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2018-12-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-02-01T00:00:00.000Z');

    res = parse('last 2 months begin', new Date('2019-02-09T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2018, month: 12, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2018, month: 12, day: 2, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2018-12-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2018-12-02T00:00:00.000Z');

    res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 24, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 26, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-24T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-26T00:00:00.000Z');

    res = parse('last 2 hours begin', new Date('2019-12-26T01:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 25, hour: 23, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 25, hour: 23, minute: 0, second: 1,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-25T23:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-25T23:00:01.000Z');

    res = parse('next 2 minutes end', new Date('2019-12-26T01:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 26, hour: 1, minute: 16, second: 59,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 26, hour: 1, minute: 17, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-26T01:16:59.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-26T01:17:00.000Z');
  });

  it('works with xAgo format', () => {
    let res;

    res = parse('2 days ago', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 24, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 25, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-24T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-25T00:00:00.000Z');

    res = parse('exact 2 days ago', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 24, hour: 2, minute: 14, second: 5,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 24, hour: 2, minute: 14, second: 6,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-24T02:14:05.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-24T02:14:06.000Z');

    res = parse('3 weeks from now', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2020, month: 1, day: 16, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 23, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2020-01-16T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-23T00:00:00.000Z');

    res = parse('exactly 3 weeks from now', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2020, month: 1, day: 16, hour: 2, minute: 14, second: 5,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 16, hour: 2, minute: 14, second: 6,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2020-01-16T02:14:05.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-16T02:14:06.000Z');

    res = parse('1 year ago', new Date('2020-02-29T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-01T00:00:00.000Z');

    res = parse('exactly 1 year ago', new Date('2020-02-29T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 2, day: 28, hour: 2, minute: 14, second: 5,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 2, day: 28, hour: 2, minute: 14, second: 6,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-02-28T02:14:05.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-02-28T02:14:06.000Z');

    res = parse('1 year ago for 5 days', new Date('2020-02-29T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 1, day: 6, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-01-06T00:00:00.000Z');

    res = parse('exactly 1 year ago for 5 days', new Date('2020-02-29T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 2, day: 28, hour: 2, minute: 14, second: 5,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 3, day: 5, hour: 2, minute: 14, second: 5,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-02-28T02:14:05.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-03-05T02:14:05.000Z');
  });

  it('works with absolute, both full and partial, dates', () => {
    let res;

    res = parse('2019/12/01', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 1,
        },
        impliedValues: { hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: { year: 2019, month: 12, day: 2, hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-02T00:00:00.000Z');

    res = parse('2019-12-01', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 1,
        },
        impliedValues: { hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: { year: 2019, month: 12, day: 2, hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-02T00:00:00.000Z');

    res = parse('2019-11-30', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 11, day: 30,
        },
        impliedValues: { hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: { year: 2019, month: 11, day: 31, hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-11-30T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-01T00:00:00.000Z');

    res = parse('2019-12-01T09:15:32Z', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 1, hour: 9, minute: 15, second: 32,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: { year: 2019, month: 12, day: 1, hour: 9, minute: 15, second: 33, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-01T09:15:32.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-01T09:15:33.000Z');

    res = parse('19:15:32', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          hour: 19, minute: 15, second: 32,
        },
        impliedValues: { year: 2019, month: 12, day: 26, millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: { year: 2019, month: 12, day: 26, hour: 19, minute: 15, second: 33, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-26T19:15:32.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-26T19:15:33.000Z');

    res = parse('15:32', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          hour: 15, minute: 32,
        },
        impliedValues: { year: 2019, month: 12, day: 26, second: 0, millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: { year: 2019, month: 12, day: 26, hour: 15, minute: 33, second: 0, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-26T15:32:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-26T15:33:00.000Z');

    res = parse('30:32', new Date('2019-12-26T02:14:05Z'));
    expect(res).toEqual(null);

    res = parse('June 2019', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 6,
        },
        impliedValues: { day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: { year: 2019, month: 7, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-06-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-07-01T00:00:00.000Z');

    res = parse('2019', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 1, day: 1,
        },
        impliedValues: { hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 1,
        },
        impliedValues: { hour: 0, minute: 0, second: 0, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-01T00:00:00.000Z');
  });

  it('works with today format', () => {
    let res;

    res = parse('today', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 31, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-31T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-01T00:00:00.000Z');

    res = parse('tomorrow', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2020, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 2, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2020-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-02T00:00:00.000Z');

    res = parse('yesterday', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 30, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 31, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-30T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-31T00:00:00.000Z');
  });

  it('can parse constants', () => {
    let res;

    res = parse('beginning', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('1970-01-01T00:00:01.000Z');

    res = parse('now', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 31, hour: 2, minute: 14, second: 5,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: {
          year: 2019, month: 12, day: 31, hour: 2, minute: 14, second: 6, millisecond: 0,
        },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-31T02:14:05.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-31T02:14:06.000Z');
  });

  it('works with end-inclusive range', () => {
    let res;

    res = parse('beginning - now', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
        },
        impliedValues: {
          year: 2019, month: 12, day: 31, hour: 2, minute: 14, second: 6, millisecond: 0,
        },
      },
    });
    expect(res.start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-31T02:14:06.000Z');

    res = parse('beginning - 3 days ago', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 29, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-29T00:00:00.000Z');

    res = parse('beginning - 3 days ago', new Date('2019-12-31T02:14:05Z'), { output: 'raw' });
    expect(res[0]).toMatchObject({
      text: 'beginning',
      start: {
        knownValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 1, millisecond: 0,
        },
      },
    });
    expect(res[0].start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res[0].end.date().toISOString()).toEqual('1970-01-01T00:00:01.000Z');
    expect(res[1]).toMatchObject({
      text: '3 days ago',
      start: {
        knownValues: {
          year: 2019, month: 12, day: 28, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 29, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res[1].start.date().toISOString()).toEqual('2019-12-28T00:00:00.000Z');
    expect(res[1].end.date().toISOString()).toEqual('2019-12-29T00:00:00.000Z');

    res = parse('3 days ago till 15:36', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 28, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          hour: 15, minute: 36,
        },
        impliedValues: { year: 2019, month: 12, day: 31, second: 0, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-28T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-31T15:36:00.000Z');
  });

  it('works with end-exclusive range', () => {
    let res;

    res = parse('beginning to now', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 31, hour: 2, minute: 14, second: 5,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-31T02:14:05.000Z');

    res = parse('beginning till 3 days ago', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 28, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-28T00:00:00.000Z');

    res = parse('beginning until 3 days ago', new Date('2019-12-31T02:14:05Z'), { output: 'raw' });
    expect(res[0]).toMatchObject({
      text: 'beginning',
      start: {
        knownValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {},
        impliedValues: {
          year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 1, millisecond: 0,
        },
      },
    });
    expect(res[0].start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res[0].end.date().toISOString()).toEqual('1970-01-01T00:00:01.000Z');
    expect(res[1]).toMatchObject({
      text: '3 days ago',
      start: {
        knownValues: {
          year: 2019, month: 12, day: 28, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 29, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res[1].start.date().toISOString()).toEqual('2019-12-28T00:00:00.000Z');
    expect(res[1].end.date().toISOString()).toEqual('2019-12-29T00:00:00.000Z');

    res = parse('3 days ago till 15:36', new Date('2019-12-31T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 28, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          hour: 15, minute: 36,
        },
        impliedValues: { year: 2019, month: 12, day: 31, second: 0, millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-28T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-31T15:36:00.000Z');
  });

  it('can parse weekdays', () => {
    let res;

    res = parse('thursday', new Date('2019-12-26T02:14:05Z'));
    expect(res).toEqual(null);

    res = parse('thursday this week', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 26, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 27, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-26T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-27T00:00:00.000Z');

    res = parse('tue last week', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2019, month: 12, day: 17, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2019, month: 12, day: 18, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-17T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-18T00:00:00.000Z');

    res = parse('wed next 2 weeks', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2020, month: 1, day: 8, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 9, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2020-01-08T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-09T00:00:00.000Z');

    res = parse('friday next weeks', new Date('2019-12-26T02:14:05Z'));
    expect(res).toMatchObject({
      start: {
        knownValues: {
          year: 2020, month: 1, day: 3, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
      end: {
        knownValues: {
          year: 2020, month: 1, day: 4, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2020-01-03T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2020-01-04T00:00:00.000Z');
  });

  it('works with timezones', () => {
    let res;

    res = parse('last week begin', new Date('2018-06-25T05:00:00+08:00'), { timezoneOffset: 60 });
    expect(res.start.date().toISOString()).toEqual('2018-06-10T23:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2018-06-11T23:00:00.000Z');
    res = parse('last week begin', new Date('2018-06-25T05:00:00+08:00'), { timezoneOffset: 180 });
    expect(res.start.date().toISOString()).toEqual('2018-06-17T21:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2018-06-18T21:00:00.000Z');

    res = parse('this week end', new Date('2018-01-01T05:00:00+08:00'), { timezoneOffset: 60 });
    expect(res.start.date().toISOString()).toEqual('2017-12-30T23:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2017-12-31T23:00:00.000Z');
    res = parse('this week end', new Date('2018-01-01T05:00:00+08:00'), { timezoneOffset: 180 });
    expect(res.start.date().toISOString()).toEqual('2018-01-06T21:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2018-01-07T21:00:00.000Z');

    res = parse('this month begin', new Date('2018-01-01T05:00:00+08:00'), { timezoneOffset: 60 });
    expect(res.start.date().toISOString()).toEqual('2017-11-30T23:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2017-12-01T23:00:00.000Z');
    res = parse('this month begin', new Date('2018-01-01T05:00:00+08:00'), { timezoneOffset: 180 });
    expect(res.start.date().toISOString()).toEqual('2017-12-31T21:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2018-01-01T21:00:00.000Z');

    res = parse('last month end', new Date('2018-01-01T05:00:00+08:00'), { timezoneOffset: 60 });
    expect(res.start.date().toISOString()).toEqual('2017-11-29T23:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2017-11-30T23:00:00.000Z');
    res = parse('last month end', new Date('2018-01-01T05:00:00+08:00'), { timezoneOffset: 180 });
    expect(res.start.date().toISOString()).toEqual('2017-12-30T21:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2017-12-31T21:00:00.000Z');

    res = parse('next month end', '2018-01-01T05:00:00+08:00', { timezoneOffset: 60 });
    expect(res.start.date().toISOString()).toEqual('2018-01-30T23:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2018-01-31T23:00:00.000Z');
    res = parse('next month end', '2018-01-01T05:00:00+08:00', { timezoneOffset: 180 });
    expect(res.start.date().toISOString()).toEqual('2018-02-27T21:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2018-02-28T21:00:00.000Z');


    res = parse('yesterday', new Date('2019-04-11T23:00:00+00:00'), { timezoneOffset: 540 });
    expect(res.start.date().toISOString()).toEqual('2019-04-10T15:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-04-11T15:00:00.000Z');
    expect(res.ref.toISOString()).toEqual('2019-04-11T23:00:00.000Z');

    res = parse('June 2019', new Date('2019-12-25T23:00:00+00:00'), { timezoneOffset: 540 });
    expect(res.start.date().toISOString()).toEqual('2019-05-31T15:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-06-30T15:00:00.000Z');

    res = parse('exactly 3 days ago', new Date('2019-12-26T04:35:19+08:00'), { timezoneOffset: 540 });
    expect(res.start.date().toISOString()).toEqual('2019-12-22T20:35:19.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-22T20:35:20.000Z');
  });

  it('has good behavior with default parsers', () => {
    let res;

    res = parse('3 o\'clock - 3 minutes ago', new Date('2019-12-26T04:35:19+08:00'), { timezoneOffset: 540 });
    expect(res.text).toEqual("3 o'clock - 3 minutes ago");
    expect(res.start.date().toISOString()).toEqual('2019-12-25T18:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-25T20:33:00.000Z');

    // ambiguous
    res = parse('within 3 days', new Date('2019-12-26T04:35:19+08:00'), { timezoneOffset: 540 });
    expect(res).toEqual(null);
  });

  it('rejects invalid reference date', () => {
    expect(() => parse('today', 'ahehe')).toThrowError(/invalid ref/i);
  });

  it('rejects invalid timezoneOffset', () => {
    expect(() => parse('today', new Date(), { timezoneOffset: 'asd' })).toThrowError(/invalid timezoneOffset/i);
  });

  it('cant output in timestamp format', () => {
    let res;

    res = parse('yesterday', new Date('2019-04-11T22:00:00+00:00'), { timezoneOffset: 420, output: 'timestamp' });
    expect(res.start).toEqual('2019-04-10T17:00:00.000Z');
    expect(res.end).toEqual('2019-04-11T17:00:00.000Z');
    res = parse('yesterday', new Date('2019-04-11T22:00:00+00:00'), { timezoneOffset: 540, output: 'timestamp' });
    expect(res.start).toEqual('2019-04-10T15:00:00.000Z');
    expect(res.end).toEqual('2019-04-11T15:00:00.000Z');
    res = parse('yesterday', new Date('2019-04-11T22:00:00+00:00'), { timezoneOffset: 60, output: 'timestamp' });
    expect(res.start).toEqual('2019-04-09T23:00:00.000Z');
    expect(res.end).toEqual('2019-04-10T23:00:00.000Z');

    res = parse('yesterday', new Date('2019-04-11T22:00:00+00:00'), { timezoneOffset: 420, output: 'date' });
    expect(res.start).toEqual('2019-04-11');
    expect(res.end).toEqual('2019-04-12');
    res = parse('yesterday', new Date('2019-04-11T22:00:00+00:00'), { timezoneOffset: 540, output: 'date' });
    expect(res.start).toEqual('2019-04-11');
    expect(res.end).toEqual('2019-04-12');
    res = parse('yesterday', new Date('2019-04-11T22:00:00+00:00'), { timezoneOffset: 60, output: 'date' });
    expect(res.start).toEqual('2019-04-10');
    expect(res.end).toEqual('2019-04-11');
    res = parse('yesterday', new Date('2019-04-11T22:00:00+00:00'), { output: 'date' });
    expect(res.start).toEqual('2019-04-10');
    expect(res.end).toEqual('2019-04-11');
  });

  it('exports necessary constants', () => {
    expect(!!OUTPUT_TYPES).toBe(true);

    expect(!!Errors).toBe(true);
    expect(!!Errors.InputError).toBe(true);
  });
});

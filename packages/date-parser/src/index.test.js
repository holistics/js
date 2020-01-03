import { parse } from './index';

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
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('2019-12-31T02:14:05.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-31T02:14:06.000Z');
  });

  it('works with range', () => {
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
          year: 2019, month: 12, day: 31, hour: 2, minute: 14, second: 5,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-31T02:14:05.000Z');

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
          year: 2019, month: 12, day: 28, hour: 0, minute: 0, second: 0,
        },
        impliedValues: { millisecond: 0 },
      },
    });
    expect(res.start.date().toISOString()).toEqual('1970-01-01T00:00:00.000Z');
    expect(res.end.date().toISOString()).toEqual('2019-12-28T00:00:00.000Z');

    res = parse('3 days ago - 15:36', new Date('2019-12-31T02:14:05Z'));
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
});

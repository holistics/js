# `@holistics/date-parser`

> Holistics (relative) date parser

## Usage (v3.x)
### API
```javascript
export const parse = (str, ref, {
  timezoneRegion = 'Etc/UTC',
  output = OUTPUT_TYPES.parsed_component,
  weekStartDay = WEEKDAYS.Monday,
  parserVersion = 2,
} = {})
```

Note
- Use `parserVersion = 2` to use the new date parser that supports timezone region 
- To use the old API of v2.x, please read the below section of v2.x
- This `parserVersion` flag is to help you gradually migrating to v3.x

### Output types:
  - date: 2021-12-01 (wallclock time, timezone is implicit)
  - timestamp: E.g. 2021-12-02 00:00:00+08:00
  - timestamp_utc: same as `timestamp` but the result is converted to UTC, e.g. 2021-12-02 16:00:00+00:00
  - raw: return the `Result` class, mostly for internal debugging
  - luxon: return a Luxon instance


### Examples
```javascript
let res = nil

res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { parserVersion: 2, output: 'date', timezoneRegion: 'America/Chicago' });
expect(res.start).toEqual('2019-12-23');
expect(res.end).toEqual('2019-12-25');

res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { parserVersion: 2, output: 'timestamp', timezoneRegion: 'America/Chicago' });
expect(res.start).toEqual('2019-12-23T00:00:00.000-06:00');
expect(res.end).toEqual('2019-12-25T00:00:00.000-06:00');

res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { parserVersion: 2, output: 'timestamp_utc', timezoneRegion: 'America/Chicago' });
expect(res.start).toEqual('2019-12-23T06:00:00.000+00:00');
expect(res.end).toEqual('2019-12-25T06:00:00.000+00:00');

res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { parserVersion: 2, output: 'luxon', timezoneRegion: 'America/Chicago' });
expect(res.start.toISO()).toEqual('2019-12-23T00:00:00.000-06:00');

res = parse('last 2 days', new Date('2019-12-26T02:14:05Z'), { parserVersion: 2, timezoneRegion: 'America/Chicago' });
expect(res.start).toEqual('2019-12-23T00:00:00.000-06:00');
```

## Usage (v2.x)
**Note**: v2.x is still applicable but it will be deprecated. No further changes will be made on the v2.x

```javascript
import { parse, OUTPUT_TYPES, WEEKDAYS } from '@holistics/date-parser';

const referenceDate = new Date();

// Using default options
console.log(parse('yesterday'), referenceDate);

const { text, ref, start, end } = parse('monday last week', '2019-01-03T03:14:29Z');
console.log(start.moment().format('YYYY/MM/DD'));
console.log(start.date().toUTCString());

// Change the output format
console.log(parse('last week begin'), referenceDate, { output: OUTPUT_TYPES.date });
console.log(parse('last week end'), referenceDate, { output: OUTPUT_TYPES.timestamp });

// Set timezoneOffset (timezoneOffset is 0 by default)
const timezoneOffset = -(new Date().getTimezoneOffset); // should use the actual offset, not the Javascript's reversed offset
console.log(parse('3 days from now'), referenceDate, { timezoneOffset });
// the following examples demonstrate why timezoneOffset is important
let res;
res = parse('yesterday', '2019-04-11T22:00:00+00:00', { output: OUTPUT_TYPES.date });
console.log(res.start) // 2019-04-10
console.log(res.end) // 2019-04-11
res = parse('yesterday', '2019-04-12T06:00:00+08:00', { output: OUTPUT_TYPES.date });
console.log(res.start) // 2019-04-10
console.log(res.end) // 2019-04-11
res = parse('yesterday', '2019-04-11T22:00:00+00:00', { timezoneOffset: 540, output: OUTPUT_TYPES.date });
console.log(res.start) // 2019-04-11
console.log(res.end) // 2019-04-12

// Set weekStartDay (weekStartDay is Monday by default)
res = parse('last week begin', '2021-05-10T22:14:05Z', { weekStartDay: WEEKDAYS.Tuesday, output: OUTPUT_TYPES.date });
console.log(res.start) // 2021-04-27
```

## Try it out
https://uho5b.csb.app/

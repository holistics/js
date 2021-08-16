# `@holistics/date-parser`

> Holistics (relative) date parser

## Usage

```javascript
import { parse, OUTPUT_TYPES, WEEKDAYS } from '@holistics/date-parser';

const referenceDate = new Date();

console.log(parse('last week begin'), referenceDate, { output: OUTPUT_TYPES.date });
console.log(parse('last week end'), referenceDate, { output: OUTPUT_TYPES.timestamp });

// Manipuate output result
let res;
res = parse('last week begin', new Date('2021-08-16T11:44:00+00:00'), { output: OUTPUT_TYPES.dayjs });
console.log(res.start.toISOString()); // 2021-08-09T00:00:00.000Z
console.log(res.end.format('YYYY-MM-DD')); // 2021-08-10

// Set timezone ('Etc/UTC' is the default)

// the following examples demonstrate why timezone is important
res = parse('yesterday', '2019-04-11T22:00:00+00:00', { output: OUTPUT_TYPES.date });
console.log(res.start) // 2019-04-10
console.log(res.end) // 2019-04-11

res = parse('yesterday', '2019-04-12T06:00:00+08:00', { output: OUTPUT_TYPES.date });
console.log(res.start) // 2019-04-10
console.log(res.end) // 2019-04-11

res = parse('yesterday', '2019-04-11T22:00:00+00:00', { timezone: 'Asia/Seoul', output: OUTPUT_TYPES.date });
console.log(res.start) // 2019-04-11
console.log(res.end) // 2019-04-12

// Set weekStartDay (weekStartDay is Monday by default)
res = parse('last week begin', '2021-05-10T22:14:05Z', { weekStartDay: WEEKDAYS.Tuesday, output: OUTPUT_TYPES.date });
console.log(res.start) // 2021-04-27
```

## Ouput Types
Currently supporting 5 output types. 
- `parsed_component` (default): Chrono parsed results
- `date`: the result is formatted to 'YYYY-MM-DD'. Result's timezone is implicitly the timezone option
- `timestamp`: the result is formatted to ISO8601
- `dayjs`: the result is a dayjs instance with correct timezone
- `raw`: for internal debugging

In next release, the default output type will be switched to dayjs type since it's more convenient to work with dayjs instance rather than Chrono types

## Try it out
https://uho5b.csb.app/

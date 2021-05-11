# `@holistics/date-parser`

> Holistics (relative) date parser

## Usage

```javascript
import { parse, OUTPUT_TYPES } from '@holistics/date-parser';

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
```

## Try it out
https://uho5b.csb.app/

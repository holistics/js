# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/holistics/js/compare/@holistics/date-parser@3.0.1...@holistics/date-parser@3.0.1) (2021-11-05)

**Note:** Version bump only for package @holistics/date-parser





## [3.0.1](https://github.com/holistics/js/compare/@holistics/date-parser@3.0.0...@holistics/date-parser@3.0.1) (2021-11-05)

### Bug Fixes

https://github.com/holistics/js/pull/15
* Bug 1: doesn't handle null result
* Bug 2: Inconsistent behavior of { zone } options in the browser. When calling with fromISO the zone is set to the DateTime instance, but when calling with fromObject the system zone (browser's zone) is used. This could be a bug of Luxon
* Bug 3: using weekdayLong is affected by locale, switch to use index


# [3.0.0](https://github.com/holistics/js/compare/@holistics/date-parser@2.9.0...@holistics/date-parser@3.0.0) (2021-10-29)
### Features
* V3 date parser including
  * Use timezone region instead of offset
  * Change to luxon to handle date-time math (previously dayjs)
  * The timezone offset of the output follows the timezone region, included ISO cases. For example: parsing 2021-01-02 00:00:00+00:00 would return 2021-01-01 17:00:00+07:00 with timezone region Singapore
  * Week Start Day: use our own logic to handle instead of using dayjs

# [2.11.0](https://github.com/holistics/js/compare/@holistics/date-parser@2.9.0...@holistics/date-parser@2.11.0) (2021-08-30)


### Bug Fixes

* handle upper characters ([bc6427e](https://github.com/holistics/js/commit/bc6427e9836aa0b80b5b3a6b61b82debca52f0df))


### Features

* support 'current' keyword ([e913f3a](https://github.com/holistics/js/commit/e913f3a4d74ff0823969aaa58bdf3c082fb71427))





# [2.10.0](https://github.com/holistics/js/compare/@holistics/date-parser@2.9.0...@holistics/date-parser@2.10.0) (2021-05-11)

**Note:** Version bump only for package @holistics/date-parser





# [2.9.0](https://github.com/holistics/js/compare/@holistics/date-parser@2.8.1...@holistics/date-parser@2.9.0) (2021-05-11)

**Note:** Version bump only for package @holistics/date-parser





## [2.8.1](https://github.com/holistics/js/compare/@holistics/date-parser@2.8.0...@holistics/date-parser@2.8.1) (2021-03-16)

**Note:** Version bump only for package @holistics/date-parser

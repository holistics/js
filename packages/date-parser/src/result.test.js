import PostResult from './result';

describe('result', () => {
  it('result can handle null case', () => {
    const res = new PostResult({
      ref: new Date(),
      index: 0,
      text: null,
      start: null,
      end: null,
    });

    res.asDayJsType();
    res.asDateType();
    res.asTimestampType();
  });
});

import getHighestLevelDateUnit from './getHighestLevelDateUnit';

describe('getHighestLevelDateUnit', () => {
  it('works', () => {
    const dateStruct = {
      minute: 1,
      hour: 2,
      year: 2020,
    };
    expect(getHighestLevelDateUnit(dateStruct)).toEqual('minute');
  });
});

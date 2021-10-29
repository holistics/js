import luxonFromStruct from './luxonFromStruct';

describe('luxonFromStruct', () => {
  it('throw errors', () => {
    const dateStruct = {
      minute: 1,
      hour: 2,
      year: 2019,
      month: 2,
      day: 30,
    };
    expect(() => {
      luxonFromStruct(dateStruct);
    }).toThrowError(/unit out of range/i);
  });
});

import momentFromStruct from './momentFromStruct';

describe('momentFromStruct', () => {
  it('validates weekStartDate', () => {
    expect(() => momentFromStruct({}, { weekStartDate: undefined })).toThrowError(/invalid weekStartDate/i);
    expect(() => momentFromStruct({}, { weekStartDate: null })).toThrowError(/invalid weekStartDate/i);
    expect(() => momentFromStruct({}, {})).toThrowError(/invalid weekStartDate/i);
    expect(() => momentFromStruct({}, { weekStartDate: -1 })).toThrowError(/invalid weekStartDate/i);
    expect(() => momentFromStruct({}, { weekStartDate: 7 })).toThrowError(/invalid weekStartDate/i);
  });
});

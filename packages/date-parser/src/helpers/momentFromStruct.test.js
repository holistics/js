import momentFromStruct from './momentFromStruct';

describe('momentFromStruct', () => {
  it('validates weekStartDay', () => {
    expect(() => momentFromStruct({}, { weekStartDay: undefined })).toThrowError(/invalid weekStartDay/i);
    expect(() => momentFromStruct({}, { weekStartDay: null })).toThrowError(/invalid weekStartDay/i);
    expect(() => momentFromStruct({}, {})).toThrowError(/invalid weekStartDay/i);
    expect(() => momentFromStruct({}, { weekStartDay: -1 })).toThrowError(/invalid weekStartDay/i);
    expect(() => momentFromStruct({}, { weekStartDay: 7 })).toThrowError(/invalid weekStartDay/i);
  });
});

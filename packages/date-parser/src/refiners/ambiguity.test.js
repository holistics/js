import ambiguity from './ambiguity';

describe('ambiguity refiner', () => {
  it('can handle empty knowValues case', () => {
    const inputResults = [
      {
        start: {
          knownValues: {},
        },
      },
    ];

    const res = ambiguity.refine(null, inputResults);
    expect(res).toEqual([]);
  });
});

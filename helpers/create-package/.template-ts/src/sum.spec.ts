import { sum } from './sum.js';

describe('sum tests', () => {
  test('it should sum two numbers', () => {
    expect(sum(1, 1)).toBe(2);
  });
});

import count from '../count';
import { interval } from 'rxjs';
import { take,tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

jest.mock('rxjs');

let testScheduler = new TestScheduler((actual, expected) => {
  console.log(actual, expected);
  expect(actual).toEqual(expected);
});

beforeEach(() => {
  testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
});

describe('actions', () => {
  it('asyncIncrement', () => {
    const commit = jest.fn();
    testScheduler.run(({ cold, expectObservable, flush }) => {
      interval.mockImplementation(() =>
        cold('-a-b-c-d', { a: 0, b: 1, c: 2, d: 3 })
      );
      const result = count.actions.asyncIncrement({ commit });
      expectObservable(result).toBe('-(a|)', { a: 0 });
    });
    expect(commit).toBeCalledWith('increment');
  });
});

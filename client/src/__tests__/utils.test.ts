import { getLocalTime, getReadableDate, humanizeDuration } from '../application/utils';
import * as moment from 'moment';

describe('humanize duration function', () => {

  it('tests with real moment', () => {
    expect(humanizeDuration(4, moment)).toBe('a few seconds');
    expect(humanizeDuration(60, moment)).toBe('a minute');
  });

});

describe('get readable date function', () => {

  it('tests with real moment', () => {
    const msInDay = 24 * 60 * 60 * 1000;
    expect(getReadableDate(0, moment)).toBe('01.01.70');
    expect(getReadableDate(4 * msInDay, moment)).toBe('05.01.70');
  });

});

describe('get local time function', () => {
  it('should return proper time', () => {
    const testTime = 15000;

    let createdTime: number = 0;
    let toLocaleWasCalled: boolean = false;

    class Date {

      public time: number;

      constructor(time: number) {
        this.time = time;
        createdTime = time;
      }

      toLocaleTimeString () {
        toLocaleWasCalled = true;
        return '2 am';
      }
    }

    expect(getLocalTime(testTime, Date)).toBe('2 am');
    expect(toLocaleWasCalled).toBe(true);
    expect(createdTime).toBe(testTime);
  });
});

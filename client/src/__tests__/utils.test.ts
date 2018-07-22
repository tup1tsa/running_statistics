import { getReadableDate, humanizeDuration } from '../application/utils';
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
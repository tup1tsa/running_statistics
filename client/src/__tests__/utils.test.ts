import { humanizeDuration } from '../utils';
import * as moment from 'moment';

describe('humanize duration function', () => {

  it('tests with real moment', () => {
    expect(humanizeDuration(4, moment)).toBe('a few seconds');
    expect(humanizeDuration(60, moment)).toBe('a minute');
  });

});
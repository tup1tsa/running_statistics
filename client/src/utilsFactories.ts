import { humanizeDuration } from './utils';
import * as moment from 'moment';

export interface HumanizeDurationFactory {
  (timeSecs: number): string;
}

export const humanizeDurationFactory: HumanizeDurationFactory = (timeSecs) =>
  humanizeDuration(timeSecs, moment);
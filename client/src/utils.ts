export interface Moment {
  duration(timeMs: number): {
    humanize: () => string;
  };
}

export interface HumanizeDuration {
  (timeSecs: number, moment: Moment): string;
}

export const humanizeDuration: HumanizeDuration = (timeSecs, moment) =>
  moment.duration(timeSecs * 1000).humanize();
interface Moment {
  duration(timeMs: number): {
    humanize: () => string;
  };
  (timestamp: number): {
    format(type: string): string;
  };
}

interface HumanizeDuration {
  (timeSecs: number, moment: Moment): string;
}

interface GetReadableDate {
  (time: number, moment: Moment): string;
}

export const getReadableDate: GetReadableDate = (time, moment) =>
  moment(time).format('DD.MM.YY');

export const humanizeDuration: HumanizeDuration = (timeSecs, moment) =>
  moment.duration(timeSecs * 1000).humanize();
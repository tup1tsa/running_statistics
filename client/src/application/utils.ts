interface Moment {
  duration(timeMs: number): {
    humanize: () => string;
  };
  (timestamp: number): {
    format(type: string): string;
  };
}

interface DateClass {
  new(time: number): {
    toLocaleTimeString: () => string;
  };
}

interface HumanizeDuration {
  (timeSecs: number, moment: Moment): string;
}

interface GetReadableDate {
  (time: number, moment: Moment): string;
}

type GetLocalTime = (time: number, Date: DateClass) => string;

export const getReadableDate: GetReadableDate = (time, moment) =>
  moment(time).format('DD.MM.YY');

export const humanizeDuration: HumanizeDuration = (timeSecs, moment) =>
  moment.duration(timeSecs * 1000).humanize();

export const getLocalTime: GetLocalTime = (time, Date) => {
  return new Date(time).toLocaleTimeString();
};
import { DateClass } from "../../common_files/interfaces";

export type GetLocalTime = (time: number) => string;
type GetLocalTimeFactory = (Date: DateClass) => GetLocalTime;

export const getLocalTimeFactory: GetLocalTimeFactory = date => time => {
  return new date(time).toLocaleTimeString();
};

export const getLocalTime: GetLocalTime = time =>
  getLocalTimeFactory(Date)(time);

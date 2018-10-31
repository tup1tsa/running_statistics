import * as moment from "moment";
import {
  getLocalTime,
  getReadableDate,
  humanizeDuration
} from "../application/utils";

export type HumanizeDurationFactory = (timeSecs: number) => string;

export type GetReadableDateFactory = (time: number) => string;

export type GetLocalTimeFactory = (time: number) => string;

export const humanizeDurationFactory: HumanizeDurationFactory = timeSecs =>
  humanizeDuration(timeSecs, moment);

export const getReadableDateFactory: GetReadableDateFactory = time =>
  getReadableDate(time, moment);

export const getLocalTimeFactory: GetLocalTimeFactory = time =>
  getLocalTime(time, Date);

import * as moment from "moment";
import {
  getLocalTime,
  getReadableDate,
  humanizeDuration
} from "../../application/logic/utils";

export type HumanizeDurationContainer = (timeSecs: number) => string;

export type GetReadableDateContainer = (time: number) => string;

export type GetLocalTimeContainer = (time: number) => string;

export const humanizeDurationContainer: HumanizeDurationContainer = timeSecs =>
  humanizeDuration(timeSecs, moment);

export const getReadableDateContainer: GetReadableDateContainer = time =>
  getReadableDate(time, moment);

export const getLocalTimeContainer: GetLocalTimeContainer = time =>
  getLocalTime(time, Date);

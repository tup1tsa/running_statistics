import Moment from "moment";
import { MomentInterface } from "running_app_core";

export type GetReadableDate = (time: number) => string;
type GetReadableDateFactory = (moment: MomentInterface) => GetReadableDate;

export const getReadableDateFactory: GetReadableDateFactory = moment => time =>
  moment(time).format("DD.MM.YY");

export const getReadableDate: GetReadableDate = time =>
  getReadableDateFactory(Moment)(time);

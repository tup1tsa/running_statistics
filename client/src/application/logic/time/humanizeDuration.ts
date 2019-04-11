import Moment from "moment";
import { MomentInterface } from "running_app_core";

export type HumanizeDuration = (timeSecs: number) => string;
type HumanizeDurationFactory = (moment: MomentInterface) => HumanizeDuration;

export const humanizeDurationFactory: HumanizeDurationFactory = moment => timeSecs =>
  moment.duration(timeSecs * 1000).humanize();

export const humanizeDuration: HumanizeDuration = timeSecs =>
  humanizeDurationFactory(Moment)(timeSecs);

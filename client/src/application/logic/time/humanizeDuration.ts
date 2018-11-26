import Moment from "moment";
import { MomentInterface } from "../../common_files/interfaces";

export type HumanizeDuration = (timeSecs: number) => string;
type HumanizeDurationFactory = (moment: MomentInterface) => HumanizeDuration;

export const humanizeDurationFactory: HumanizeDurationFactory = moment => timeSecs =>
  moment.duration(timeSecs * 1000).humanize();

export const humanizeDuration: HumanizeDuration = timeSecs =>
  humanizeDurationFactory(Moment)(timeSecs);

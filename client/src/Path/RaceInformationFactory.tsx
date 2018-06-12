import * as React from 'react';
import { HumanizeDuration, RaceInformation } from './RaceInformation';
import * as moment from 'moment';

interface Props {
  totalDistance: number;
  totalTimeSecs: number;
  avgSpeed: number;
}

const humanizeDuration: HumanizeDuration = (time) => moment.duration(time).humanize();

export const RaceInformationFactory = (props: Props) => (
  <RaceInformation
    totalDistance={props.totalDistance}
    totalTimeSecs={props.totalTimeSecs}
    avgSpeed={props.avgSpeed}
    humanizeDuration={humanizeDuration}
  />
);
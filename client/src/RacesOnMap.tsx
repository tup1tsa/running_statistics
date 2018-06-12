import { DividedPathPart } from './Path/pathUtils';
import * as React from 'react';
import { SparsePolyline } from './GoogleMap/SparsePolyline';
import { MapWrapperFactory } from './GoogleMap/MapWrapperFactory';
import { Position, Race } from './common_files/interfaces';
import { GetRaceInfoFactory } from './Path/pathUtilsFactories';
import { FinishedRaceInfoFactory } from './Path/FinishedRaceInfoFactory';

interface State {
  currentRaceIndex: number;
}

interface Props {
  size: {
    width: number;
    height: number;
  };
  races: Race[];
  activeColor: string;
  inactiveColor: string;
  findCenter: (path: Position[]) => Position;
  divideRace: (race:  Race) => DividedPathPart[];
  getRaceInfo: GetRaceInfoFactory;
}

export class RacesOnMap extends React.Component<Props, State> {
 constructor(props: Props) {
   super(props);
   this.state = {currentRaceIndex: this.props.races.length - 1};

   this.incrementRace = this.incrementRace.bind(this);
   this.decrementRace = this.decrementRace.bind(this);
 }

  render() {
    const sortedRaces = this.getSortedRaces();
    const currentRace = sortedRaces[this.state.currentRaceIndex];
    const dividedRace = this.props.divideRace(currentRace);
    const pathWithColors = dividedRace
      .map((racePart: DividedPathPart) => {
        const color = racePart.active ? this.props.activeColor : this.props.inactiveColor;
        return {
          positions: racePart.path,
          color
        };
      });
    const mapProps = {
      width: this.props.size.width,
      height: this.props.size.height,
      center: this.props.findCenter(currentRace.path),
      zoom: 12
    };
    const Map = MapWrapperFactory(SparsePolyline);
    const buttons = (
      <>
        <button type="button" id="next_race" onClick={this.incrementRace}>Next race</button>
        <button type="button" id="previous_race" onClick={this.decrementRace}>Previous race</button>
      </>
    );
    const raceInfo = this.props.getRaceInfo(currentRace);
    const lastPosition = currentRace.path[currentRace.path.length - 1];
    return (
      <div>
        <Map path={pathWithColors} {...mapProps} />
        <FinishedRaceInfoFactory
          totalDistance={raceInfo.distance}
          totalTimeSecs={raceInfo.timeSecs}
          avgSpeed={raceInfo.averageSpeed}
          lastTimeCheck={lastPosition.time}
          raceType={currentRace.type}
        />
        {this.props.races.length > 1 ? buttons : null}
      </div>
    );
  }

  private incrementRace() {
   let nextRaceIndex = this.state.currentRaceIndex + 1;
   if (nextRaceIndex >= this.props.races.length) {
     nextRaceIndex = 0;
   }
   this.setState({currentRaceIndex: nextRaceIndex});
 }

 private decrementRace() {
   let nextRaceIndex = this.state.currentRaceIndex - 1;
   if (nextRaceIndex < 0) {
     nextRaceIndex = this.props.races.length - 1;
   }
   this.setState({currentRaceIndex: nextRaceIndex});
 }

  private getSortedRaces() {
    return this.props.races.sort((firstRace, secondRace) => {
      const firstRaceTime = firstRace.path[firstRace.path.length - 1].time;
      const secondRaceTime = secondRace.path[secondRace.path.length - 1].time;
      if (firstRaceTime > secondRaceTime) {
        return 1;
      }
      if (firstRaceTime < secondRaceTime) {
        return -1;
      }
      return 0;
    });
  }
}
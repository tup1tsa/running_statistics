import { DividedPathPart } from './Path/pathUtils';
import * as React from 'react';
import { SparsePolyline } from './GoogleMap/SparsePolyline';
import { MapWrapperFactory } from './GoogleMap/MapWrapperFactory';
import { Position, PositionInTime } from './common_files/interfaces';

interface State {
  currentRaceIndex: number;
}

// todo: add here race information block somehow

interface Props {
  size: {
    width: number;
    height: number;
  };
  races: DividedPathPart[][];
  activeColor: string;
  inactiveColor: string;
  findCenter: (path: Position[]) => Position;
  unitePath: (path: DividedPathPart[]) => PositionInTime[];
}

export class RacesOnMap extends React.Component<Props, State> {
 constructor(props: Props) {
   super(props);
   this.state = {currentRaceIndex: 0};

   this.incrementRace = this.incrementRace.bind(this);
   this.decrementRace = this.decrementRace.bind(this);
 }

 incrementRace() {
   let nextRaceIndex = this.state.currentRaceIndex + 1;
   if (nextRaceIndex >= this.props.races.length) {
     nextRaceIndex = 0;
   }
   this.setState({currentRaceIndex: nextRaceIndex});
 }

 decrementRace() {
   let nextRaceIndex = this.state.currentRaceIndex - 1;
   if (nextRaceIndex < 0) {
     nextRaceIndex = this.props.races.length - 1;
   }
   this.setState({currentRaceIndex: nextRaceIndex});
 }

 render() {
   const pathWithColors = this.props.races[this.state.currentRaceIndex]
     .map((racePart: DividedPathPart) => {
       const color = racePart.active ? this.props.activeColor : this.props.inactiveColor;
       return {
         positions: racePart.path,
         color
       };
     });
   const wholePath = this.props.unitePath(this.props.races[0]);
   const mapProps = {
     width: this.props.size.width,
     height: this.props.size.height,
     center: this.props.findCenter(wholePath),
     zoom: 12
   };
   const Map = MapWrapperFactory(SparsePolyline);
   const buttons = (
     <>
       <button type="button" id="next_race" onClick={this.incrementRace}>Next race</button>
       <button type="button" id="previous_race" onClick={this.decrementRace}>Previous race</button>
     </>
   );
   return (
     <div>
       <Map path={pathWithColors} {...mapProps} />
       {this.props.races.length > 1 ? buttons : null}
     </div>
   );
 }
}
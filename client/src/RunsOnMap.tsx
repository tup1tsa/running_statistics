import { DividedPathPart } from './Path/pathUtils';
import * as React from 'react';
import { SparsePolyline } from './GoogleMap/SparsePolyline';
import { MapWrapperFactory } from './GoogleMap/MapWrapperFactory';
import { Position, PositionInTime } from './common_files/interfaces';

interface State {
  currentRunIndex: number;
}

interface Props {
  size: {
    width: number;
    height: number;
  };
  runs: DividedPathPart[][];
  activeColor: string;
  inactiveColor: string;
  findCenter: (path: Position[]) => Position;
  unitePath: (path: DividedPathPart[]) => PositionInTime[];
}

export class RunsOnMap extends React.Component<Props, State> {
 constructor(props: Props) {
   super(props);
   this.state = {currentRunIndex: 0};

   this.incrementRun = this.incrementRun.bind(this);
   this.decrementRun = this.decrementRun.bind(this);
 }

 incrementRun() {
   let nextRunIndex = this.state.currentRunIndex + 1;
   if (nextRunIndex >= this.props.runs.length) {
     nextRunIndex = 0;
   }
   this.setState({currentRunIndex: nextRunIndex});
 }

 decrementRun() {
   let nextRunIndex = this.state.currentRunIndex - 1;
   if (nextRunIndex < 0) {
     nextRunIndex = this.props.runs.length - 1;
   }
   this.setState({currentRunIndex: nextRunIndex});
 }

 render() {
   const pathWithColors = this.props.runs[this.state.currentRunIndex]
     .map((runPart: DividedPathPart) => {
       const color = runPart.active ? this.props.activeColor : this.props.inactiveColor;
       return {
         positions: runPart.path,
         color
       };
     });
   const wholePath = this.props.unitePath(this.props.runs[0]);
   const mapProps = {
     width: this.props.size.width,
     height: this.props.size.height,
     center: this.props.findCenter(wholePath),
     zoom: 12
   };
   const Map = MapWrapperFactory(SparsePolyline);
   const buttons = (
     <>
       <button type="button" id="next_run" onClick={this.incrementRun}>Next run</button>
       <button type="button" id="previous_run" onClick={this.decrementRun}>Previous run</button>
     </>
   );
   return (
     <div>
       <Map path={pathWithColors} {...mapProps} />
       {this.props.runs.length > 1 ? buttons : null}
     </div>
   );
 }
}
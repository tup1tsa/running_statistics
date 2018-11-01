import * as React from "react";
import { MapWrapperFactory } from "../../containers/components/GoogleMap/MapWrapperFactory";
import { FinishedRaceInfoFactory } from "../../containers/components/Path/FinishedRaceInfoFactory";
import { DivideRaceContainer } from "../../containers/logic/path/divideRaceContainer";
import { GetRaceInfoContainer } from "../../containers/logic/path/getRaceInfoContainer";
import { Race } from "../common_files/interfaces";
import { FindCenter } from "../logic/path/findCenter";
import { GetRacePart } from "../logic/path/getRacePart";
import { SparsePolyline } from "./GoogleMap/SparsePolyline";
import { RaceViewerSlider } from "./RaceViewerSlider";

interface State {
  readonly currentRaceIndex: number;
  readonly partialRaceRange: {
    readonly start: number;
    readonly finish: number;
  };
}

interface Props {
  readonly size: {
    readonly width: number;
    readonly height: number;
  };
  readonly races: ReadonlyArray<Race>;
  readonly activeColor: string;
  readonly inactiveColor: string;
  readonly findCenter: FindCenter;
  readonly divideRace: DivideRaceContainer;
  readonly getRaceInfo: GetRaceInfoContainer;
  readonly getRacePart: GetRacePart;
}

export class RacesOnMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentRaceIndex: this.props.races.length - 1,
      partialRaceRange: {
        start: 0,
        finish: 100
      }
    };

    this.incrementRace = this.incrementRace.bind(this);
    this.decrementRace = this.decrementRace.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  public handleSliderChange(startSlider: number, finishSlider: number) {
    this.setState({
      partialRaceRange: {
        start: startSlider,
        finish: finishSlider
      }
    });
  }

  public render() {
    const sortedRaces = this.getSortedRaces();
    const wholeRace = sortedRaces[this.state.currentRaceIndex];
    const currentRace = this.props.getRacePart(
      wholeRace,
      this.state.partialRaceRange.start,
      this.state.partialRaceRange.finish
    );
    const dividedRace = this.props.divideRace(currentRace);
    const pathWithColors = dividedRace.map(racePart => {
      const color = racePart.active
        ? this.props.activeColor
        : this.props.inactiveColor;
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
        <button type="button" id="previous_race" onClick={this.decrementRace}>
          Previous race
        </button>
        <button type="button" id="next_race" onClick={this.incrementRace}>
          Next race
        </button>
      </>
    );
    const raceInfo = this.props.getRaceInfo(currentRace);
    const lastPosition = currentRace.path[currentRace.path.length - 1];
    return (
      <div>
        <Map path={pathWithColors} {...mapProps} />
        <div
          style={{
            marginLeft: "5%",
            float: "left",
            width: "5%",
            height: this.props.size.height / 5
          }}
        >
          <RaceViewerSlider
            handleChange={this.handleSliderChange}
            defaults={{
              startSliderValue: 0,
              finishSliderValue: 100
            }}
          />
        </div>
        <div style={{ clear: "both" }} />
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
    this.setState({ currentRaceIndex: nextRaceIndex });
  }

  private decrementRace() {
    let nextRaceIndex = this.state.currentRaceIndex - 1;
    if (nextRaceIndex < 0) {
      nextRaceIndex = this.props.races.length - 1;
    }
    this.setState({ currentRaceIndex: nextRaceIndex });
  }

  private getSortedRaces() {
    // @ts-ignore
    // todo: fix it
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

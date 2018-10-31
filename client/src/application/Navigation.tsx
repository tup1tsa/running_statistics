import * as React from "react";
import { RaceStartPreparationFactory } from "../factories/RaceStartPreparationFactory";
import { RaceViewerFactory } from "../factories/RaceViewerFactory";

interface State {
  readonly activeBlock: string;
  readonly finishRaceMessage: string;
}

export class Navigation extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeBlock: "",
      finishRaceMessage: ""
    };

    this.startRace = this.startRace.bind(this);
    this.finishRace = this.finishRace.bind(this);
    this.showStatsBlock = this.showStatsBlock.bind(this);
  }

  public startRace() {
    this.setState({ activeBlock: "race" });
  }

  public finishRace(message: string) {
    this.setState({ activeBlock: "", finishRaceMessage: message });
  }

  public showStatsBlock() {
    this.setState({ activeBlock: "stats" });
  }

  public render() {
    if (this.state.activeBlock === "race") {
      return (
        <div>
          <RaceStartPreparationFactory setSaveResult={this.finishRace} />
        </div>
      );
    }
    return (
      <div>
        <button className="blue" id="start_race" onClick={this.startRace}>
          Start race
        </button>
        <button className="blue" id="show_stats" onClick={this.showStatsBlock}>
          Show stats
        </button>
        {this.state.activeBlock === "stats" ? (
          <RaceViewerFactory />
        ) : (
          <p>{this.state.finishRaceMessage}</p>
        )}
      </div>
    );
  }
}

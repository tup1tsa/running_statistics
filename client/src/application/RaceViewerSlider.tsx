import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";

interface Props {
  readonly handleChange: (startSlider: number, finishSlider: number) => void;
  readonly defaults: {
    readonly startSliderValue: number;
    readonly finishSliderValue: number;
  };
}

interface State {
  readonly startSlider: number;
  readonly finishSlider: number;
}

export class RaceViewerSlider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      startSlider: this.props.defaults.startSliderValue,
      finishSlider: this.props.defaults.finishSliderValue
    };

    this.handleFinishSliderChange = this.handleFinishSliderChange.bind(this);
    this.handleStartSliderChange = this.handleStartSliderChange.bind(this);
  }

  public handleStartSliderChange(value: number) {
    const currentFinishSlider = this.state.finishSlider;
    const nextFinishSlider =
      value <= currentFinishSlider ? currentFinishSlider : value;
    this.setState({ startSlider: value, finishSlider: nextFinishSlider });
    this.props.handleChange(value, nextFinishSlider);
  }

  public handleFinishSliderChange(value: number) {
    const currentStartSlider = this.state.startSlider;
    const nextStartSlider =
      value >= currentStartSlider ? currentStartSlider : value;
    this.setState({ startSlider: nextStartSlider, finishSlider: value });
    this.props.handleChange(nextStartSlider, value);
  }

  public render() {
    const { startSliderValue, finishSliderValue } = this.props.defaults;
    return (
      <div
        style={{
          height: "100%"
        }}
      >
        <div style={{ float: "left", height: "100%" }}>
          <p>Start</p>
          <Slider
            vertical={true}
            defaultValue={startSliderValue}
            onAfterChange={this.handleStartSliderChange}
          />
        </div>
        <div style={{ float: "right", height: "100%" }}>
          <p>Finish</p>
          <Slider
            vertical={true}
            defaultValue={finishSliderValue}
            onAfterChange={this.handleFinishSliderChange}
          />
        </div>
      </div>
    );
  }
}

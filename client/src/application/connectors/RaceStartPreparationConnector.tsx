import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RaceType } from "../actions/actions";
import { startTrackingRace } from "../actions/async/startTrackingRace";
import {
  RaceStartPreparation,
  RaceStartPreparationProps
} from "../components/RaceStartPreparation";

type MapDispatchToProps = (dispatch: Dispatch) => RaceStartPreparationProps;

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  startTrackingRace: (raceType: RaceType) =>
    startTrackingRace(raceType)(dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(RaceStartPreparation);

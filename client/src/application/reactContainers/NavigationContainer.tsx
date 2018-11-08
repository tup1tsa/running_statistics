import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Navigation, NavigationProps } from "../components/Navigation";

type MapDispatchToProps = (dispatch: Dispatch) => NavigationProps;

export const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  startRaceBlock: () => dispatch(push("/startRace")),
  detailedRaceStats: () => dispatch(push("/detailedRaceStats")),
  overallRaceStats: () => dispatch(push("/overallRaceStats"))
});

export default connect(
  null,
  mapDispatchToProps
)(Navigation);

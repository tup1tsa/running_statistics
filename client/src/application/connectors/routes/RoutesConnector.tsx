import { connect } from "react-redux";
import Routes, { RouteStateProps } from "../../components/routes/Routes";
import { isUserAuthorized } from "../../logic/isUserAuthorized";
import { GlobalState } from "../../reducers/rootReducer";

type MapStateToProps = (state: GlobalState) => RouteStateProps;
export const mapStateToProps: MapStateToProps = state => ({
  checkAuth: () => isUserAuthorized(state)
});

export default connect(mapStateToProps)(Routes);

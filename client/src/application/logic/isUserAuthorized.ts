import { GlobalState } from "../reducers/rootReducer";

type IsUserAuthorized = (state: GlobalState) => boolean;
export const isUserAuthorized: IsUserAuthorized = ({ user }) => {
  if (!user.emailVerified) {
    return false;
  }
  if (!user.isLoggedIn) {
    return false;
  }
  return true;
};

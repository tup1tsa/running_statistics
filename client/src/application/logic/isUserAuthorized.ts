import { GlobalState } from "../reducers/rootReducer";

type IsUserAuthorized = (state: GlobalState) => boolean;
export const isUserAuthorized: IsUserAuthorized = ({ login, user }) => {
  if (!user.isEmailVerified) {
    return false;
  }
  if (login.inProgress) {
    return false;
  }
  if (!login.isLoggedIn) {
    return false;
  }
  return true;
};

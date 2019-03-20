import React, { ComponentClass, FunctionComponent } from "react";
import { Route, RouteProps } from "react-router";
import AuthCheckerConnector from "../../connectors/Auth/AuthCheckerConnector";

// https://tylermcginnis.com/react-router-protected-routes-authentication/

interface CheckAuth {
  readonly checkAuth: () => boolean;
}
interface ProvidedComponentInterface {
  readonly component: ComponentClass | FunctionComponent;
}
type PrivateRouteProps = CheckAuth & RouteProps & ProvidedComponentInterface;

export const PrivateRoute = ({
  component: ProvidedComponent,
  checkAuth,
  ...rest
}: PrivateRouteProps) => (
  <Route
    {...rest}
    // tslint:disable-next-line jsx-no-lambda
    render={props =>
      checkAuth() ? <ProvidedComponent {...props} /> : <AuthCheckerConnector />
    }
  />
);

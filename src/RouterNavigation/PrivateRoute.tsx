import { Navigate, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function PrivateRoute({ children }: RouteProps): JSX.Element {
  const { user } = useSelector((state: RootState) => state.auth);
  return <>{user.userUID.length ? children : <Navigate to="/signin" />}</>;
}

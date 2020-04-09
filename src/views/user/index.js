import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../../store";
import {logoutUser} from "../../redux/auth/actions";

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
);
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
);
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './reset-password')
);

const User = ({ match }) => {
  var isAuthenticated = false;
  const token = localStorage.getItem('jwtToken')
  if (token) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
    }
    else{
      isAuthenticated = true;
    }
  }
  if (isAuthenticated){
    return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect to={{
            pathname:'/app'
          }} />
          <Route
            path={`${match.url}/login`}
            render={props => <Login {...props} />}
          />
          <Route
            path={`${match.url}/register`}
            render={props => <Register {...props} />}
          />
          <Route
            path={`${match.url}/forgot-password`}
            render={props => <ForgotPassword {...props} />}
          />
          <Route
            path={`${match.url}/reset-password`}
            render={props => <ResetPassword {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
  }
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/login`}
            render={props => <Login {...props} />}
          />
          <Route
            path={`${match.url}/register`}
            render={props => <Register {...props} />}
          />
          <Route
            path={`${match.url}/forgot-password`}
            render={props => <ForgotPassword {...props} />}
          />
          <Route
            path={`${match.url}/reset-password`}
            render={props => <ResetPassword {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;

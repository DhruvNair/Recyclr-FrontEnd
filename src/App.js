import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { getDirection } from './helpers/Utils';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "./store";
import {logoutUser} from "./redux/auth/actions";

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
);
const ViewAdmin = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/admin')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const BuyView = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/buy')
);
const SellView = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/sell')
);
const CartView = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/cart')
);
const PickupsView = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/pickups')
);
const OrdersView = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/orders')
);
const AllOrdersView = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/allorders')
);
const InventoryView = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/inventory')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
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
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const AdminRoute = ({ component: Component, authUser, ...rest }) => {
  var isAdmin = false;
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
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.userType === "admin"){
        isAdmin = true;
      }
    }
  }
  return (
    <Route
      {...rest}
      render={props =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
const PartnerRoute = ({ component: Component, authUser, ...rest }) => {
  var isPartner = false;
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
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.userType === "partner"){
        isPartner = true;
      }
    }
  }
  return (
    <Route
      {...rest}
      render={props =>
        isPartner ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    this.state ={
      user : JSON.parse(localStorage.getItem('user'))
    }
  }

  render() {
    const { locale, loginUser } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <AdminRoute
                    path="/admin"
                    component={ViewAdmin}
                  />
                  <Route
                    path="/user"
                    render={props => <ViewUser {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={props => <ViewError {...props} />}
                  />
                  <Route
                    path="/"
                    exact
                    render={props => <ViewMain {...props} />}
                  />
                  <AuthRoute
                    path="/buy"
                    authUser={loginUser}
                    component={BuyView}
                  />
                  <AuthRoute
                    path="/sell"
                    authUser={loginUser}
                    component={SellView}
                  />
                  <AuthRoute
                    path="/cart"
                    authUser={loginUser}
                    component={CartView}
                  />
                  <AuthRoute
                    path="/orders"
                    authUser={loginUser}
                    component={OrdersView}
                  />
                  <PartnerRoute
                    exact
                    path="/pickups"
                    authUser={loginUser}
                    component={PickupsView}
                  />
                  <PartnerRoute
                    path="/allOrders"
                    authUser={loginUser}
                    component={AllOrdersView}
                  />
                  <PartnerRoute
                    path="/inventory"
                    authUser={loginUser}
                    component={InventoryView}
                  />
                  <AuthRoute
                    path="/pickups"
                    authUser={loginUser}
                    component={PickupsView}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { user: loginUser } = authUser;
  const { locale } = settings;
  return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);

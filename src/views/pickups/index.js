import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
const Overview = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './overview')
);
const PickupDetails = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './details')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Route
                exact
                path={`${match.url}/`}
                render={props => <Overview {...props} />}
              />
              <Route
                path={`${match.url}/pickup`}
                render={props => <PickupDetails {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
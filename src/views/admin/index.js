import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
const Console = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './console')
);
const AddAdmin = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './addadmin')
);
const AddPartner = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './addpartner')
);
const AddDevice = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './adddevice')
);
const AddPart = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './addpart')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/console`} />
              <Route
                path={`${match.url}/console`}
                render={props => <Console {...props} />}
              />
              <Route
                path={`${match.url}/addadmin`}
                render={props => <AddAdmin {...props} />}
              />
              <Route
                path={`${match.url}/addpartner`}
                render={props => <AddPartner {...props} />}
              />
              <Route
                path={`${match.url}/addPart`}
                render={props => <AddPart {...props} />}
              />
              <Route
                path={`${match.url}/adddevice`}
                render={props => <AddDevice {...props} />}
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

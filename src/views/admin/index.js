import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
const Console = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './console')
);
const Admins = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './admins')
);
const Partners = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './partners')
);
const Devices = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './devices')
);
const Parts = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './parts')
);
const EditDevice = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './editdevice')
);
const EditPart = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './editpart')
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
                path={`${match.url}/admins`}
                render={props => <Admins {...props} />}
              />
              <Route
                path={`${match.url}/partners`}
                render={props => <Partners {...props} />}
              />
              <Route
                path={`${match.url}/parts`}
                render={props => <Parts {...props} />}
              />
              <Route
                path={`${match.url}/devices`}
                render={props => <Devices {...props} />}
              />
              <Route
                path={`${match.url}/editpart`}
                render={props => <EditPart {...props} />}
              />
              <Route
                path={`${match.url}/editdevice`}
                render={props => <EditDevice {...props} />}
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
                path={`${match.url}/addpart`}
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

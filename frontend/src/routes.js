import React from 'react';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { isUserAdmin } from 'util/user';

/** ROUTES **/

// Layout
import App from 'layouts/App';
import AppShell from 'layouts/AppShell';

// Auth
import NotFound from 'pages/NotFound';
import NotLoggedIn from 'pages/NotLoggedIn';
import Login from 'pages/Login';
import Signup from 'pages/Signup';

// Pages
import Landing from 'pages/Landing';
import Wiki from 'pages/Wiki/Wiki';
import WikiDetails from 'pages/Wiki/WikiDetails';
import AdminHome from 'pages/Admin/AdminHome';
import AdminUniversities from 'pages/Admin/AdminUniversities';


// Google Analytics
import ReactGA from 'react-ga';
ReactGA.initialize(process.env.GA_ID);
 
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

const Routes = ({ store }) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);

  // Route hooks
  const adminRequired = (nextState, replace) => {
    const state = store.getState();

    if (!isUserAdmin(state['User/currentUser'])) {
      replace({
        pathname: '/'
      });
    }
  };

  return (
    <Provider store={ store }>
      <Router history={ history } onUpdate={ logPageView }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Landing } />

          <Route component={ AppShell }>
            <Route path="signup" component={ Signup } />
            <Route path="login" component={ Login } />

            <Route path="wiki">
              <IndexRoute component={ Wiki } />
              <Route path=":wikiTitle" component={ WikiDetails } />
            </Route>
            
            <Route path="admin" onEnter={ adminRequired }>
              <IndexRoute component={ AdminHome } />
              <Route path="universities" component={ AdminUniversities } />
            </Route>

            <Route path="notLoggedIn" component={ NotLoggedIn } />
            <Route path="*" component={ NotFound } />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
};

Routes.propTypes = {
  store: React.PropTypes.object.isRequired,
};

export default Routes;
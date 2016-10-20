import React from 'react';

import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';

/** ROUTES **/

// Layout
import App from './layouts/app';
import Home from './layouts/home';

import Events from './pages/home/events';
import Chat from './pages/home/chat';
import Friends from './pages/home/friends';
import Landing from './pages/landing';
import NotFound from './pages/not-found';
import Profile from './pages/profile';
import Wiki from './pages/wiki';
import Stories from './pages/stories/stories';
import StoryDetails from './pages/stories/story';
import EditStory from './pages/editStory';
import NotLoggedIn from './pages/notloggedin';
import Signup from './pages/signup';
import Verify from './pages/verify';
import Settings from './pages/settings';
import NewEvent from './pages/home/newevent';

// Redux
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export const getRoutes = (store) =>{

  const authRequired = (nextState, replace) => {
    // Now you can access the store object here.
    const state = store.getState();

    /* >>>>>>>>>>>> tmp remove check for development <<<<<<<<<<<< */
    // if (!state.user.isAuthenticated) {
    //   replace({ 
    //     pathname: '/notloggedin'
    //   });
    // }
  };

  const goToDefaultGroup = (nextState, replace)=>{
    // Now you can access the store object here.
    const state = store.getState();
    replace({
      pathname: `/home/${state.home.homeGroupDetails.homeGroupDetails.id}`, //should be state.user.defaultGroupId
      state: { nextPathname: nextState.location.pathname }
    });
  }

  return(
  <Route path="/" component={ App }>
    <IndexRoute component={Landing}/>
    <Route path="home" onEnter={authRequired}>
      <IndexRoute onEnter={goToDefaultGroup}/>
      <Route path=":id" component={Home}> 
        <IndexRoute component={Events}/>
        <Route path="events">
          <IndexRoute component={Events}/>
          <Route path="new" component={NewEvent}/>
        </Route>
        <Route path="chat" component={Chat}/>
        <Route path="friends" component={Friends}/>
      </Route>
    </Route>
    <Route path="editStory" component={EditStory} onEnter={authRequired}/>
    <Route path="stories">
      <IndexRoute component={Stories}/>
      <Route path=":storyId" component={StoryDetails}/>
    </Route>
    <Route path="wiki" component={Wiki}/>
    <Route path="profile(/:userId)" component={ Profile } />
    <Route path="notloggedin" component={NotLoggedIn}/>
    <Route path="signup" component={Signup}/>
    <Route path="verify">
      <Route path=":token" component={Verify}/>
    </Route>
    <Route path='settings' component={Settings}/>
    <Route path="*" component={NotFound}/>
  </Route>
  );
}

export default (
      <Provider store={ store }>
        <Router history={ history }>
          { getRoutes(store) }
        </Router>
      </Provider>
);
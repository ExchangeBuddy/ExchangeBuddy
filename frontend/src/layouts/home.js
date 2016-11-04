import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import { 
  toggleBottomBarVisibility, 
  toggleHomeSearchDrawerOpenButtonVisibility,
  toggleTopBarBackButtonVisibility, toggleTopBarVisibility, 
  toggleTopBarSettingsButtonVisibility
} from '../actions/pageVisibility';
import {
  fetchMyGroups, fetchMyGroupsSuccess, fetchMyGroupsFailure,
  fetchCurrentGroup, fetchCurrentGroupSuccess, fetchCurrentGroupFailure,
  toggleSelectedHomeGroup, fetchEvents, fetchEventsSuccess, 
  fetchEventsFailure, resetEvents,addJoyride
} from '../actions/home';
import { clearUser } from '../actions/authActions';

import Joyride from 'react-joyride';

import Header from '../components/Header';

class Home extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      ready: false
    };
  }

  componentDidMount() {
    this.props.addJoyride(this.joyride);
    this.props.toggleBottomBarVisibility(true);
    this.props.toggleTopBarVisibility(true);
    this.props.toggleHomeSearchDrawerOpenButtonVisibility(true);
    this.props.toggleTopBarBackButtonVisibility(false);
    this.props.toggleTopBarSettingsButtonVisibility(true);

    //if user is authenticated, fetch group and point groupDetails to that
    /*if(this.props.user.isAuthenticated){

    }else{

    }*/
    
    this.props.fetchMyGroups(this.props.user.id);

    setTimeout(() => {
      this.setState({
        ready: true
      });
    }, 1000);

  }

  componentDidUpdate(prevProps, prevState) {
    /*if (!prevState.ready && this.state.ready) {
      this.joyride.start();
    }*/
  }

  componentWillUnmount(){
    this.props.toggleHomeSearchDrawerOpenButtonVisibility(false);
    this.props.toggleTopBarBackButtonVisibility(false);
    this.props.toggleTopBarSettingsButtonVisibility(false);
  }

  render() {
    const{homeGroupsLoaded} = this.props;
    return (
      <div>
      {<Header params={ this.props.params } tab={ this.props.routes[2].path } />}
      <div id="group-container">
      <Joyride ref={c => (this.joyride = c)} steps={this.state.steps} debug={true} />
      { homeGroupsLoaded?(this.props.children):(<h1>Loading home groups...</h1>) }
      </div>

    {/*<SwitchGroupDialog />*/}
    </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
    toggleHomeSearchDrawerOpenButtonVisibility:visibility=>dispatch
    (toggleHomeSearchDrawerOpenButtonVisibility(visibility)),
    toggleTopBarBackButtonVisibility:visibility=>dispatch
    (toggleTopBarBackButtonVisibility(visibility)),
    toggleTopBarSettingsButtonVisibility:visibility=>dispatch
    (toggleTopBarSettingsButtonVisibility(visibility)),
    fetchMyGroups: (userId) => {
      dispatch(fetchMyGroups(userId)).payload.then((response) => {
        if (!response.error) {
          var selectedIndex = 0;
          dispatch(fetchMyGroupsSuccess(response.body));
          browserHistory.push(`/home/${response.body[0].id}`)
          dispatch(toggleSelectedHomeGroup(selectedIndex))
          dispatch(fetchEvents(response.body[selectedIndex].id)).payload.then((response) => {
            if (!response.error) {
              dispatch(fetchEventsSuccess(response.body));
            } else {
              dispatch(fetchEventsFailure(response.error));
            }
          }, (err) => {
            if (err.status === 401) {
              cookie.remove('authToken');
              dispatch(clearUser());
              // need to redirect to a new version of login page
              browserHistory.push('/');
            } else {
              dispatch(fetchEventsFailure(err.response.error.message));
            }
          });
          dispatch(fetchCurrentGroup(response.body[selectedIndex].id)).payload.then((response) => {
            if (!response.error) {
              dispatch(fetchCurrentGroupSuccess(response.body));
            } else {
              dispatch(fetchCurrentGroupFailure(response.error));
            }
          }, (err) => {
            if (err.status === 401) {
              cookie.remove('authToken');
              dispatch(clearUser());
              // need to redirect to a new version of login page
              browserHistory.push('/');
            } else {
              dispatch(fetchCurrentGroupFailure(err.response.error.message));
            }
          });
        } else {
          dispatch(fetchMyGroupsFailure(response.error));
        }
      }, (err) => {
        if (err.status === 401) {
          cookie.remove('authToken');
          dispatch(clearUser());
          // need to redirect to a new version of login page
          browserHistory.push('/');
        } else {
          dispatch(fetchMyGroupsFailure(err.response.error.message));
        }
      });
    },
    addJoyride: (joyride)=>{
      dispatch(addJoyride(joyride))
    }
  };
};

const mapStateToProps = (state)=>{
  return {
    user:state.user.userObject,
    homeGroupsLoaded: state.home.homeGroups.groupsLoaded
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
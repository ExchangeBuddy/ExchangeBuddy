import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
	editUniversities, editUniversitiesSuccess, editUniversitiesFailure
} from '../../../actions/profile';
// Component
import ChildComponent from './CompleteExchangeForm';

const mapStateToProps = (state) => {
  return{
    updateStatus: state.user,
  	user: state.user.userObject,
    universities: state.utilityInfo.universitiesList.universities
  };
};

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    updateUniInfo: (userId, homeUniId, exUniId, exYear, exMonth) => {
      dispatch(editUniversities(userId, homeUniId, exUniId, exYear, exMonth)).payload.then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch(editUniversitiesSuccess(response.body.user));
        } else {
          dispatch(editUniversitiesFailure(response.error));
        }
      }, (err) => {
        if (err.status === 401) {
          cookie.remove('authToken');
          dispatch(clearUser());
          // need to redirect to a new version of login page
          browserHistory.push('/');
        } else {
          dispatch(editUniversitiesFailure(err.response.error.message));
        }
      });
    }
  };
};

const CompleteExchangeForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default CompleteExchangeForm;

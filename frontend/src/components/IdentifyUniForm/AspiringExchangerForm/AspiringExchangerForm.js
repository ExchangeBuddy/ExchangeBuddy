import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import { AutoCompleteFormField } from '../../Field';


let universitiesProps;

const validate = (values) => {
  const errors = {};
  const { homeUniName } = values;

  if (!homeUniName || !homeUniName.length) {
    errors['homeUniName'] = 'Required'
  } else if (universitiesProps && universitiesProps.filter(uni => uni.name === values.homeUniName).length === 0 ) {
    errors['homeUniName'] = 'University not found';
  }
  
  return errors;
};

const filter = (searchText, key) => {

  searchText = searchText.toLowerCase();
  key = key.toLowerCase().replace(/[^a-z0-9 ]/g, '');

  if (searchText.length < 3)
    return false;

  return searchText.split(' ').every(searchTextSubstring =>
    key.split(' ').some(s => s.substr(0, searchTextSubstring.length) == searchTextSubstring)
  );
};

class AspiringExchangerForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      submitted: false
    }
  }

  componentDidUpdate() {
    const { fetchingAuthUpdate, error } = this.props.updateStatus;
    if (!!this.props.user.UniversityId && !fetchingAuthUpdate && !error) {
      if(!(window.location.pathname.split('/')[1]==='profile')){
        browserHistory.push('/home');
      }else{
        if(this.state.submitted){
          browserHistory.push('/profile');
          this.props.showSnackbar('Universties have been updated!');
        }
      }
    }
  }

  render() {
    const { universities, handleSubmit } = this.props;
    const { fetchingAuthUpdate, error } = this.props.updateStatus;
    universitiesProps = universities;

    return (
      <div>
        <form className="select-uni-form" onSubmit={ handleSubmit((values) => {
          this.submitForm(values)
        }) }>
          <AutoCompleteFormField
              name="homeUniName"
              floatingLabelText="Current university"
              openOnFocus={true}
              filter={ filter }
              maxSearchResults={10}
              dataSource={ universities.map((uni) => uni.name) } 
          />
          <div style={{ marginTop: 12 }}>
            <RaisedButton
              disableTouchRipple={true}
              disableFocusRipple={true}
              primary={true}
              type="submit"
              style={{ margin: 6 }}
              label="Submit" 
              disabled={fetchingAuthUpdate}
            />
          </div>

          { fetchingAuthUpdate ? <p>Updating... Please be patient. :)</p> : null }

          { 
            error ? 
              error.error ?
                <p>{ error.error }</p> 
              : <p>{ error }</p> 
            : null
          }
        </form>
      </div>
    );
  }

  submitForm(val) {
    const { user, universities } = this.props;
    for (var i=0; i<universities.length; i++) {
      if (universities[i].name === val.homeUniName) {
        this.props.updateUniInfo(user.id, universities[i].id);
        this.setState({...this.state, submitted:true});
      }
    }
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'AspiringExchangerForm',
  validate
})(AspiringExchangerForm);
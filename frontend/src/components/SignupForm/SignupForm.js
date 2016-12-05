import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login';

import { TextFormField } from '../Field';
import { EmailFormField } from '../Field';
import { PasswordFormField } from '../Field';


const responseFacebook = (attemptFacebookLogin) => (response) => {attemptFacebookLogin(response.accessToken)};

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'userName', 'userEmail', 'userPassword', 'userConfirmPassword' ];
  const { userEmail, userPassword, userConfirmPassword } = values;
  
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  if (!userEmail || !userEmail.length) {
    errors['userEmail'] = 'Required'
  } else if (!validator.isEmail(userEmail)) {
    errors['userEmail'] = 'That doesn\'t look like an email address. :o';
  }

  if (!!userPassword && !!userConfirmPassword) {
    if (userPassword.length < 8) {
      errors['userPassword'] = 'Secure password (at least 8 digits) is the new fashion!';
    } else if (userPassword !== userConfirmPassword) {
      errors['userConfirmPassword'] = 'Two passwords must match';
    }
  }
  
  return errors;
};

class SignupForm extends React.Component {
  componentDidUpdate() {
    const { isLoggedIn, isAuthenticated, token } = this.props.userAuthData;
    
    if (isLoggedIn && isAuthenticated && token){
      browserHistory.push('/home');
    }
  }

  render() {
    const { handleSubmit, submitting, authEmailError } = this.props;
    const { isEmailSent } = this.props.userAuthData;

    return (
      <div>
        <div className="social-network-wrapper">
          {/*<div style={{marginRight: 40}}><p>Social Network Signup :</p></div>*/}
          <div><FacebookLogin
            appId="580995375434079"
            scope="public_profile"
            fields="name, email"
            callback={ responseFacebook(this.props.attemptFacebookLogin) }
            cssClass="facebook-login-button"
            textButton= "Continue with Facebook"
            icon="fa-facebook fa-1x" 
          /></div>
        </div>

        <p className="line-seperator" style={{marginTop: 20}}> or </p>

        <form onSubmit={ handleSubmit((values) => {
          this.submitForm(values)
        }) }>
          <TextFormField name="userName" floatingLabelText="Your name" />

          <EmailFormField
            name="userEmail"
            floatingLabelText="Your email address" />

          <PasswordFormField
            name="userPassword" floatingLabelText="Your password (more than 8 digits)" />
          <PasswordFormField
            name="userConfirmPassword" floatingLabelText="Confirm your password" />

          <div className="row" style={{marginTop: 18}}>
            <div className="info-container-col signup-button-container">
              <RaisedButton className="raised-btn" label="Continue" primary type="submit" style={{ width: '100%' }}/>
            </div>
          </div>
        </form>

        { submitting ? <p>Registering user. Please be patient. :)</p> : null }

        { 
          isEmailSent ? 
          <div className="verification-msg-wrapper"> 
            <p>Verification email sent!</p> 
            <p>Check your mail to start connecting with people!</p>
            <p>If you did not receive the mail, kindly check your <b>JUNK</b> mail.</p>
            <p>We're still in the process of recycling. :)</p>
          </div> 
          : null 
        }

        { 
          authEmailError ? 
            authEmailError.error ?
              <p>{ authEmailError.error }</p> 
            : <p>{ authEmailError }</p> 
          : null
        }
      </div>
    );
  }

  submitForm(val) {
    this.props.submitSignupForm(val);
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'SignupForm',
  validate
})(SignupForm);
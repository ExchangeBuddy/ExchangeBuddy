import request from 'superagent';

/*
 * action types
 */
export const Clicked_Login = 'Clicked_Login';
export const Login_Success = 'Login_Success';
export const Login_Fail = 'Login_Fail';

export const Not_Registered = 'Not_Registered';

export const Started_Session_Check = 'Started_Session_Check';
export const Checked_Session_Status = 'Checked_Session_Status';

export const Clicked_Logout = 'Clicked_Logout';
export const Logout_Success = 'Logout_Success';

// Note: Considered creating a new actions file for navigation
//              related actions. For now, will leave these here.
export const Navigate_Away_From_Auth_Form = 'Navigate_Away_From_Auth_Form';

/*
 * action creators
 */

import {ROOT_URL} from '../util/backend';

export function clickedLogin() {
    return { type: Clicked_Login };
}

export function loginSuccess(userObject, token) {
    return { type: Login_Success, userObject, token };
}

export function loginFail(error) {
    return { type: Login_Fail, error };
}

export function requireRegistration(fbToken, user, error) {
    return { type: Not_Registered, fbToken, user, error };
}

export function attemptLogin(token) {
  return (dispatch) => {
    dispatch(clickedLogin());

    request
      .post(ROOT_URL + '/authenticate')
      .send({ facebookToken: token })
      .end(function(err,res){
        // console.log(res);
        // console.log(err);
        if(res.body.status === "success"){
          dispatch(loginSuccess(res.body.user, res.body.token));
        } else {
          if (res.status === 404) {
            dispatch(requireRegistration(token, res.body.user, res.body.message));
          } else {
            dispatch(loginFail({error:res.body.message}));
          }
        }
      })
  }
}

export function startedSessionCheck() {
    return { type: Started_Session_Check };
}

export function checkedSessionStatus(result) {
    return { type: Checked_Session_Status, result };
}

export function checkSessionStatus() {
  return (dispatch) => {
    dispatch(startedSessionCheck());

    request
    .post('/checkSession')
    .withCredentials()
    .end(function(err,res){
      if(err){
        console.log(err)
      } else {
        console
        dispatch(checkedSessionStatus(res.body))
      }
    })
  }
}


export function clickedLogout() {
    return { type: Clicked_Logout };
}

export function logoutSuccess() {
    return { type: Logout_Success };
}

export function attemptLogout(){
  return (dispatch) => {
    dispatch(clickedLogout());

    request
    .post('/logout')
    .end(function(err,res){
      if(err)
        console.log(err)
      dispatch(logoutSuccess());
    })
  }
}


export function navigatedAwayFromAuthFormPage() {
    return { type: Navigate_Away_From_Auth_Form }
}

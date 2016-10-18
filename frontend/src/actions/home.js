import axios from 'axios';
import {ROOT_URL} from '../util/backend';

export const TOGGLE_SELECTED_HOME_GROUP = 'TOGGLE_SELECTED_HOME_GROUP';
export const TOGGLE_HOME_TAB = 'TOGGLE_HOME_TAB';

/************************************************************
FETCHING INITIAL CHATS OF A GROUP, UPDATING CHAT
************************************************************/

export const FETCH_GROUP_MESSAGES = 'FETCH_GROUP_MESSAGES';
export const FETCH_GROUP_MESSAGES_SUCCESS = 'FETCH_GROUP_MESSAGES_SUCCESS';
export const FETCH_GROUP_MESSAGES_FAILURE = 'FETCH_GROUP_MESSAGES_FAILURE';
export const RESET_GROUP_MESSAGES = 'RESET_GROUP_MESSAGES';
export const UPDATE_GROUP_MESSAGE_FROM_SOCKET = 'UPDATE_GROUP_MESSAGE_FROM_SOCKET';

export function fetchGroupMessages(GroupId){

	const req = axios.post(`${ROOT_URL}/messages`, 
	{
		GroupId: GroupId
	})
	return {
		type: FETCH_GROUP_MESSAGES,
		payload: req
	};
}

export function fetchGroupMessagesSuccess(group){
	return {
		type: FETCH_GROUP_MESSAGES_SUCCESS,
		payload: group
	};
}

export function fetchGroupMessagesFailure(error){
	return {
		type: FETCH_GROUP_MESSAGES_FAILURE,
		payload: error
	};
}

export function resetGroupMessages(message){
	return{
		type: RESET_GROUP_MESSAGES
	}
}

export function updateGroupMessageFromSocket(message){
	return {
		type: UPDATE_GROUP_MESSAGE_FROM_SOCKET,
		payload: message
	};
}

/************************************************************
FETCHING A SINGLE GROUP OF USER (which populates members page also)
************************************************************/

export const FETCH_CURRENT_GROUP = 'FETCH_CURRENT_GROUP';
export const FETCH_CURRENT_GROUP_SUCCESS = 'FETCH_CURRENT_GROUP_SUCCESS';
export const FETCH_CURRENT_GROUP_FAILURE = 'FETCH_CURRENT_GROUP_FAILURE';
export const RESET_CURRENT_GROUP = 'RESET_CURRENT_GROUP';

export function fetchCurrentGroup(id){

	const req = axios.get(`${ROOT_URL}/group/${id}`)
	return {
		type: FETCH_CURRENT_GROUP,
		payload: req
	};
}

export function fetchCurrentGroupSuccess(group){
	return {
		type: FETCH_CURRENT_GROUP_SUCCESS,
		payload: group
	};
}

export function fetchCurrentGroupFailure(error){
	return {
		type: FETCH_CURRENT_GROUP_FAILURE,
		payload: error
	};
}

export function resetCurrentGroup(){
	return{
		type: RESET_CURRENT_GROUP
	}
}

/************************************************************
FETCHING ALL GROUPS OF AUTH USER
************************************************************/

export const FETCH_MY_GROUPS = 'FETCH_MY_GROUPS';
export const FETCH_MY_GROUPS_SUCCESS = 'FETCH_MY_GROUPS_SUCCESS';
export const FETCH_MY_GROUPS_FAILURE = 'FETCH_MY_GROUPS_FAILURE';
export const RESET_MY_GROUPS = 'RESET_MY_GROUPS';

export function fetchMyGroups(userId){

	const req = axios.post(`${ROOT_URL}/group`, 
	{
		userId: userId
	})
	return {
		type: FETCH_MY_GROUPS,
		payload: req
	};

}

export function fetchMyGroupsSuccess(groups){
	return {
		type: FETCH_MY_GROUPS_SUCCESS,
		payload: groups
	};
}

export function fetchMyGroupsFailure(error){
	//console.log(error);
	return {
		type: FETCH_MY_GROUPS_FAILURE,
		payload: error
	};
}

export function resetMyGroups(){
	return{
		type: RESET_MY_GROUPS
	}
}


//export function fetchMyGroups()

/************************************************************
FETCHING EVENTS OF A GROUP
************************************************************/

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const RESET_EVENTS = 'RESET_EVENTS';

export function fetchEvents(GroupId){

	const req = axios.post(`${ROOT_URL}/allEvents`, 
	{
		GroupId: GroupId
	})
	return {
		type: FETCH_EVENTS,
		payload: req
	};

}

export function fetchEventsSuccess(events){
	//console.log(events);
	return {
		type: FETCH_EVENTS_SUCCESS,
		payload: events
	};
}

export function fetchEventsFailure(error){
	//console.log(error);
	return {
		type: FETCH_EVENTS_FAILURE,
		payload: error
	};
}

export function resetEvents(){
	return{
		type: RESET_EVENTS
	}
}

/************************************************************
POSTING EVENTS TO A GROUP
************************************************************/

export const POST_EVENTS = 'POST_EVENTS';

export function postEvents(lat, lng, title, startTime, endTime, detail, imgSrc, GroupId, UserId){

	const req = axios.put(`${ROOT_URL}/events`, 
	{
		lat: lat,
		lng: lng,
		title: title,
		startTime: startTime,
		endTime: endTime,
		detail: detail,
		imgSrc: imgSrc,
		GroupId: GroupId,
		UserId: UserId
	})
	return {
		type: POST_EVENTS,
		payload: req
	};

}

/************************************************************
TOGGLING BETWEEN GROUPS
************************************************************/

export function toggleSelectedHomeGroup(index){
	return{
		type: TOGGLE_SELECTED_HOME_GROUP,
		index
	}
}

/************************************************************
TOGGLING HOME TAB
************************************************************/
export function toggleHomeTab(tabValue){
	return{
		type: TOGGLE_HOME_TAB,
		tabValue
	}
}

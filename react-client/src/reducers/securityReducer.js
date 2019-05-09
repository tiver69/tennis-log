import { SET_CURRENT_USER, GET_UNREGISTERED, GET_NEW_PLAYER } from '../actions/types';

const initialState ={
	player: {},
	isTokenValid: false,
	unregistered: []
};

const booleanActionPayload = (payload) =>{
	if (payload){
		return true
	}
	else {
		return false
	}
}

export default function (state = initialState, action){
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isTokenValid: booleanActionPayload(action.payload),
				player: action.payload
			};
		case GET_UNREGISTERED:
			return {
				...state,
				unregistered: action.payload
			};
		case GET_NEW_PLAYER:
			return {
				...state,
				player: action.payload
			};

		default:
			return state;
	}
}
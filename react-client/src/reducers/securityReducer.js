import { SET_CURRENT_USER } from '../actions/types';

const initialState ={
	player: {},
	isTokenValid: false
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
			}

		default:
			return state;
	}
}
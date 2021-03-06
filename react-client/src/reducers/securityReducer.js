import { SET_CURRENT_USER, GET_CURRENT_PLAYER, GET_CURRENT_PLAYER_MATCHES, SET_ADMIN, REMOVE_ADMIN, GET_CURRENT_PLAYER_STATISTIC } from '../actions/types';

const initialState ={
	player: {},
	isTokenValid: false,
	currentPlayer: {},
	currentPlayerMatches: [],
	currentPlayerStatistic: {}
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
		case GET_CURRENT_PLAYER:
			return {
				...state,
				currentPlayer: action.payload
			};
		case GET_CURRENT_PLAYER_MATCHES:
			return {
				...state,
				currentPlayerMatches: action.payload
			};
		case GET_CURRENT_PLAYER_STATISTIC:
			return {
				...state,
				currentPlayerStatistic: action.payload
			};
		case SET_ADMIN:
			return {
				...state
			};
		case REMOVE_ADMIN:
			return {
				...state
			};
		default:
			return state;
	}
}
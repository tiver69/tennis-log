import { GET_PLAYERS, GET_UNREGISTERED, GET_NEW_PLAYER } from "../actions/types";

const initialState = {
	player: {},
	players: [],
	unregistered: []
};

export default function(state = initialState, action){
	switch (action.type) {
		case GET_PLAYERS:
			return {
				...state,
				players: action.payload
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
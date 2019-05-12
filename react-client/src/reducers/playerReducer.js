import { GET_PLAYERS, GET_PLAYER } from "../actions/types";

const initialState = {
	player: {},
	players: []
};

export default function(state = initialState, action){
	switch (action.type) {
		case GET_PLAYERS:
			return {
				...state,
				players: action.payload
			};
		case GET_PLAYER:
			return {
				...state,
				player: action.payload
			};

		default:
			return state;
	}
}
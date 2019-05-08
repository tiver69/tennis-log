import { GET_PLAYERS, GET_CURRENT_PLAYER } from "../actions/types";

const initialState = {
	players: [],
	currentPlayer: {}
};

export default function(state = initialState, action){
	switch (action.type) {
		case GET_PLAYERS:
			return {
				...state,
				players: action.payload
			};

		case GET_CURRENT_PLAYER:
			return {
				...state,
				currentPlayer: action.payload
			};
		
		default:
			return state;
	}
}
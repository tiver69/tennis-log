import { GET_PLAYERS, GET_CURRENT_PLAYER, GET_CURRENT_PLAYER_MATCHES } from "../actions/types";

const initialState = {
	players: [],
	currentPlayer: {},
	currentPlayerMatches: []
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
		
		case GET_CURRENT_PLAYER_MATCHES:
			return {
				...state,
				currentPlayerMatches: action.payload
			};

		default:
			return state;
	}
}
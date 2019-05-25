import { GET_PLAYERS, GET_PLAYER, GET_PLAYERS_POINTS} from "../actions/types";

const initialState = {
	player: {},
	players: [],
	points: []
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
		case GET_PLAYERS_POINTS:
			return {
				...state,
				points: action.payload
			}


		default:
			return state;
	}
}
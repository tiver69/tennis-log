import { GET_TOURNAMENTS, GET_TOURNAMENT, DELETE_TOURNAMENT } from "../actions/types";

const initialState = {
	tournaments: [],
	tournament: {}
};

export default function(state = initialState, action){
	switch (action.type) {
		case GET_TOURNAMENTS:
			return {
				...state,
				tournaments: action.payload
			};
		case GET_TOURNAMENT:
			return {
				...state,
				tournament: action.payload
			};
		case DELETE_TOURNAMENT:
			return{
				...state,
				tournaments: state.tournaments.filter(tournament => tournament.id !== action.payload)
			};

		default:
			return state;
	}
}
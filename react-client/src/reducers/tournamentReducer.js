import { GET_TOURNAMENTS, GET_TOURNAMENT, DELETE_TOURNAMENT, GET_ROUND_TOURNAMENT, GET_TOURNAMENT_PLAYERS } from "../actions/types";

const initialState = {
	tournaments: [],
	tournament: {},
	roundResult: [],
	tournamentPlayers: []
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
		case GET_ROUND_TOURNAMENT:
			return{
				...state,
				roundResult: action.payload
			};
		case GET_TOURNAMENT_PLAYERS:
			return{
				...state,
				tournamentPlayers: action.payload
			};

		default:
			return state;
	}
}
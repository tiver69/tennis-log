import { GET_TOURNAMENT_MATCHES, DELETE_MATCH, GET_MATCH } from '../actions/types';

const initialState ={
	matches: [],
	tennisMatch: {}
};

export default function (state = initialState, action){
	switch (action.type) {
		case GET_TOURNAMENT_MATCHES:
			return {
				...state,
				matches: action.payload
			}

		case GET_MATCH:
			return{
				...state,
				tennisMatch: action.payload
			}

		case DELETE_MATCH:
			return{
				...state
				// is coming
			}

		default:
			return state;
	}
}
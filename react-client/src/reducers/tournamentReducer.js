import { GET_TOURNAMENTS } from "../actions/types";

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
		
		default:
			return state;
	}
}
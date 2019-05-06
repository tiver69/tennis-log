import axios from 'axios';
import { GET_ERRORS } from './types';

export const createPlayer = (player, history) => async dispatch => {
	try {
		await axios.post("/api/player/register", player);
		history.push("/login");
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
	}
	catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

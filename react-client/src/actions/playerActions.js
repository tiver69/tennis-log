import axios from 'axios';
import { GET_PLAYERS } from './types';

export const getPlayers = () => async dispatch => {
	const res = await axios.get("/api/player/all");
	dispatch({
		type: GET_PLAYERS,
		payload: res.data
	});
};

import axios from 'axios';
import { GET_PLAYERS, GET_ERRORS, GET_UNREGISTERED, GET_NEW_PLAYER } from './types';

export const getPlayers = () => async dispatch => {
	const res = await axios.get("/api/player/all");
	dispatch({
		type: GET_PLAYERS,
		payload: res.data
	});
};

export const updatePlayer = (player, history) => async dispatch => {
	try {
		await axios.post("/api/player/current/update", player);
		history.push("/account");
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

export const getUnregistered = () => async dispatch => {
	const res = await axios.get("/api/player/free/unregistered");
	dispatch({
		type: GET_UNREGISTERED,
		payload: res.data
	});
};

export const getNewPlayer = (playerId, history) => async dispatch => {

	dispatch({
		type:GET_ERRORS,
		payload: {}
	});

	try {
		const res = await axios.get(`/api/player/free/${playerId}`);
		dispatch({
			type: GET_NEW_PLAYER,
			payload: res.data
		});
	}
	catch (err) {
		history.push("/unregistered");
	}
};
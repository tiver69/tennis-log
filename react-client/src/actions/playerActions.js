import axios from 'axios';
import { GET_PLAYERS, GET_ERRORS, GET_PLAYER, GET_PLAYERS_POINTS } from './types';

export const getPlayers = () => async dispatch => {
	const res = await axios.get("/api/player/all");
	dispatch({
		type: GET_PLAYERS,
		payload: res.data
	});
};

export const updatePlayer = (player, isAdminUpdate, history) => async dispatch => {
	try {
		await axios.post("/api/player/update", player);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		if (isAdminUpdate)
			history.push("/playerboard");
		else
			history.push("/account");
	}
	catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const getPlayer = (playerId, history) => async dispatch => {

	dispatch({
		type:GET_ERRORS,
		payload: {}
	});

	try {
		const res = await axios.get(`/api/player/${playerId}`);
		dispatch({
			type: GET_PLAYER,
			payload: res.data
		});
	}
	catch (err) {
		history.push("/playerboard");
	}
};

export const getPoints = () => async dispatch => {
	const res = await axios.get("/api/tournament/results");
	dispatch({
		type: GET_PLAYERS_POINTS,
		payload: res.data
	});
};
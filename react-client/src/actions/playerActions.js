import axios from 'axios';
import { GET_PLAYERS, GET_CURRENT_PLAYER, GET_ERRORS, GET_CURRENT_PLAYER_MATCHES } from './types';

export const getPlayers = () => async dispatch => {
	const res = await axios.get("/api/player/all");
	dispatch({
		type: GET_PLAYERS,
		payload: res.data
	});
};

export const getCurrentPlayer = () => async dispatch => {
	try {
	const res = await axios.get("/api/player/current");
	dispatch({
		type: GET_CURRENT_PLAYER,
		payload: res.data
	});
	} catch(err) {
		dispatch({
			type:GET_ERRORS,
			payload:err.response.data
		});
	}
};

export const getCurrentPlayerMatches = () => async dispatch => {
	const res = await axios.get("/api/player/matches");
	dispatch({
		type: GET_CURRENT_PLAYER_MATCHES,
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
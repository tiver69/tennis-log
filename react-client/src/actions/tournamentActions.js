import axios from 'axios';
import { GET_ERRORS, GET_TOURNAMENTS, GET_TOURNAMENT } from './types';

export const createTournament = (tournament, history) => async dispatch => {
	try {
		const res = await axios.post("http://localhost:8080/api/tournament", tournament);
		history.push("/dashboard");
		dispatch({
			type:GET_ERRORS,
			payload: {}
		});
	} catch (err) {
		dispatch({
			type:GET_ERRORS,
			payload:err.response.data
		});
	}
};

export const getTournaments = () => async dispatch => {
	const res = await axios.get("http://localhost:8080/api/tournament/all");
	dispatch({
		type: GET_TOURNAMENTS,
		payload: res.data
	});
};

export const getTournament = (tournamentId, history) => async dispatch => {
	try{
		const res = await axios.get(`http://localhost:8080/api/tournament/${tournamentId}`);
		dispatch ({
			type:GET_TOURNAMENT,
			payload: res.data
		});
	} catch (err) {
		history.push("/dashboard");
	}
};

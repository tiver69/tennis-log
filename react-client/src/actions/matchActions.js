import axios from 'axios';
import { GET_ERRORS, GET_TOURNAMENT_MATCHES, GET_MATCH, DELETE_MATCH } from './types';


export const createMatch = (playerOneId, playerTwoId, tournamentId, match, history) => async dispatch => {
	try {
		await axios.post(`/api/match/${playerOneId}-${playerTwoId}/${tournamentId}`, match);
		history.push(`/tournamentBoard/${tournamentId}`);
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

export const getTournamentMatches = (tournamentId) => async dispatch => {
	try {
		const res = await axios.get(`/api/tournament/${tournamentId}/matches`);
		dispatch({
			type: GET_TOURNAMENT_MATCHES,
			payload: res.data
		});
	}
	catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const getMatch = (matchId, tournamentId, history) => async dispatch => {
	try {
		const res = await axios.get(`/api/match/${matchId}`);
		dispatch({
			type: GET_MATCH,
			payload: res.data
		});
	} catch (err) {
		history.push(`/tournamentBoard/${tournamentId}`);
		// dispatch({
		// 	type: GET_ERRORS,
		// 	payload: err.response.data
		// });		
	}
};

export const deleteMatch = matchId => async dispatch => {

	if ( window.confirm("Are you sure? This will delete the match.") )
	{	
		await axios.delete(`/api/match/${matchId}`);
		dispatch ({
			type: DELETE_MATCH,
			payload: matchId
		});
	}
};
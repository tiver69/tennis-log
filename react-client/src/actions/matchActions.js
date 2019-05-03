import axios from 'axios';
import { GET_ERRORS } from './types';


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
}
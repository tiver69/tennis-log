import axios from 'axios';


export const createMatch = (playerOneId, playerTwoId, tournamentId, match, history) => async dispatch => {

	await axios.post(`/api/match/${playerOneId}-${playerTwoId}/${tournamentId}`, match);
	history.push(`/tournamentBoard/${tournamentId}`);

}
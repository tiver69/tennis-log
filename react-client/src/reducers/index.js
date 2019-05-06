import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import tournamentReducer from './tournamentReducer';
import matchReducer from './matchReducer';
import playerReducer from './playerReducer';
import securityReducer from './securityReducer';

export default combineReducers({
	errors: errorReducer,
	tournament: tournamentReducer,
	tennisMatch: matchReducer,
	player: playerReducer,
	security: securityReducer
});

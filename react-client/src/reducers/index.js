import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import tournamentReducer from './tournamentReducer';
import matchReducer from './matchReducer';

export default combineReducers({
	errors: errorReducer,
	tournament: tournamentReducer,
	match: matchReducer
});

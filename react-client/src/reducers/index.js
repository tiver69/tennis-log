import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import tournamentReducer from './tournamentReducer';

export default combineReducers({
	errors: errorReducer,
	tournament: tournamentReducer
});

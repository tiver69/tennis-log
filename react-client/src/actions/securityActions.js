import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJWTToken from '../securityUtils/securityJWTToken';
import jwt_decode from 'jwt-decode';

export const createPlayer = (player, history) => async dispatch => {
	try {
		await axios.post("/api/player/register", player);
		history.push("/login");
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

export const login = loginRequest => async dispatch => {
	try {
		const res = await axios.post("/api/player/login", loginRequest);
		const { token } = res.data;
		localStorage.setItem("jwtToken", token);
		setJWTToken(token);
		const decoded = jwt_decode(token);
		dispatch({
			type: SET_CURRENT_USER,
			payload: decoded
		});
		// console.log("done");

	}
	catch (err) {
		// console.log("error");
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const logout = () => dispatch => {
	localStorage.removeItem("jwtToken");
	setJWTToken(false);
	dispatch({
		type: SET_CURRENT_USER,
		payload: {}
	});
};
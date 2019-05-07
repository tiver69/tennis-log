import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';
import AddTournament from './components/Tournament/AddTournament';
import UpdateTournament from './components/Tournament/UpdateTournament';
import TournamentBoard from './components/TournamentBoard/TournamentBoard';
import AddMatch from './components/TournamentBoard/Match/AddMatch';
import UpdateMatch from './components/TournamentBoard/Match/UpdateMatch';
import Landing from './components/Layout/Landing';
import Register from './components/PlayerManagment/Register';
import Login from './components/PlayerManagment/Login';
import Footer from './components/Layout/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import setJWTToken from './securityUtils/securityJWTToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
	setJWTToken(jwtToken);
	const decoded_jwtToken = jwt_decode(jwtToken);
	store.dispatch({
		type: SET_CURRENT_USER,
		payload: decoded_jwtToken
	});

	const currentTime = Date.now()/1000;
	if (decoded_jwtToken.exp < currentTime) {
		store.dispatch(logout())
			window.location.href = "/";
	}
}

function App() {
return (
	<Provider store={ store }>
	<Router>
	<div className="App">
		<Header />
		{
			//Public routes
		}
		<Route exact path="/" component={ Landing }/>
		<Route exact path="/register" component={ Register }/>
		<Route exact path="/login" component={ Login }/>
		{
			//Private routes
		}
		<Route exact path="/dashboard" component={ Dashboard }/>
		<Route exact path="/addTournament" component={ AddTournament }/>
		<Route exact path="/updateTournament/:tournamentId" component={ UpdateTournament }/>
		<Route exact path="/tournamentBoard/:tournamentId" component={ TournamentBoard }/>
		<Route exact path="/addMatch/:tournamentId" component={ AddMatch }/>
		<Route exact path="/updateMatch/t-:tournamentId/m-:matchId" component={ UpdateMatch }/>
		<Footer />
	</div>
	</Router>
	</Provider>
	);
 }

export default App;

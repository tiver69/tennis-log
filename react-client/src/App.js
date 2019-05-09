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
import RegisterExisting from './components/PlayerManagment/RegisterExisting';
import UpdateExisting from './components/PlayerManagment/UpdateExisting';
import PlayerPage from './components/PlayerManagment/PlayerPage';
import UnregisteredPlayers from './components/PlayerManagment/UnregisteredPlayers';
import Login from './components/PlayerManagment/Login';
import Footer from './components/Layout/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import setJWTToken from './securityUtils/securityJWTToken';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
import SecuredRoute from './securityUtils/SecureRoute';

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
		store.dispatch(logout());
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
		<Route exact path="/unregistered" component={ UnregisteredPlayers }/>
		<Route exact path="/register/:playerId" component={ RegisterExisting }/>
			
		{
			//Private routes
		}
		<Switch>
			<SecuredRoute exact path="/dashboard" component={ Dashboard }/>
			<SecuredRoute exact path="/addTournament" component={ AddTournament }/>
			<SecuredRoute exact path="/updateTournament/:tournamentId" component={ UpdateTournament }/>
			<SecuredRoute exact path="/tournamentBoard/:tournamentId" component={ TournamentBoard }/>
			<SecuredRoute exact path="/addMatch/:tournamentId" component={ AddMatch }/>
			<SecuredRoute exact path="/updateMatch/t-:tournamentId/m-:matchId" component={ UpdateMatch }/>
			<SecuredRoute exact path="/account" component={ PlayerPage }/>
			<SecuredRoute exact path="/account/update" component={ UpdateExisting }/>
		</Switch>
		<Footer />
	</div>
	</Router>
	</Provider>
	);
 }

export default App;

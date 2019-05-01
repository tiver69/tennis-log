import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';
import AddTournament from './components/Tournament/AddTournament';
import Footer from './components/Layout/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'



function App() {
return (
	<Provider store={ store }>
	<Router>
	<div className="App">
		<Header />
		<Route exact path="/dashboard" component={ Dashboard }/>
		<Route exact path="/addTournament" component={ AddTournament }/>
		<Footer />
	</div>
	</Router>
	</Provider>
	);
 }

export default App;

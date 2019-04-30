import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Layout/Footer';


function App() {
return (
	<div className="App">
		<Header />
		<Dashboard/>
		<Footer />
	</div>
	);
 }

export default App;

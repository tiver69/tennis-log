import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout} from '../../actions/securityActions';


class Header extends Component {

	logout(){
		this.props.logout();
		window.location.href = "/";
	}
	
	render(){
		const {isTokenValid, player} = this.props.security;

		const playerIsAuthenticated = (
			<div className="collapse navbar-collapse" id="mobile-nav">
			    <ul className="navbar-nav mr-auto">
			        <li className="nav-item">
			            <Link className="nav-link" to="/dashboard">
			                Tournaments
			            </Link>
			        </li>
			        { 
			      	isTokenValid &&
			        player.roles.includes("ADMIN") &&
			        <li className="nav-item">
			            <Link className="nav-link" to="/playerboard">
			                Players
			            </Link>
			        </li>
			    	}
			    </ul>

		        <ul className="navbar-nav ml-auto">
		            <li className="nav-item">
		                <Link className="nav-link " to="/account">
		                	<i className="fas fa-user-circle mr-1"> {player.username}</i>
		                </Link>
		            </li>
		            <li className="nav-item">
		                <Link className="nav-link" to="/logout" onClick={this.logout.bind(this)}>
		                    Logout
		                </Link>
		            </li>
		        </ul>
		    </div>
		);

		const playerIsNotAuthenticated = (
			<div className="collapse navbar-collapse" id="mobile-nav">
		        <ul className="navbar-nav ml-auto">
		            <li className="nav-item">
		                <Link className="nav-link " to="/register">
		                	Sign Up
		                </Link>
		            </li>
		            <li className="nav-item">
		                <Link className="nav-link" to="/login">
		                    Login
		                </Link>
		            </li>
		        </ul>
		    </div>
		);

		let headerLinks;

		if(isTokenValid && player){
			headerLinks = playerIsAuthenticated;
		}
		else{
			headerLinks = playerIsNotAuthenticated;
		}

		return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
		    <div className="container">
		        <Link className="navbar-brand" to="/">
		            Tennis Tournament Explorer
		        </Link>
		        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
		            <span className="navbar-toggler-icon" />
		        </button>
		        {headerLinks}
	        </div>
	    </nav>
		);
	}
}

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps, { logout } ) (Header);

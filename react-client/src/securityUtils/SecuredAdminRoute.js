import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SecuredAdminRoute = ({component:Component, security, ...otherProps}) => (
	<Route {...otherProps} 
		render = {props => (security.isTokenValid === true
			 && security.player.roles.includes("ADMIN")) ? 
		(<Component {...props}/>) : (<Redirect to="/account"/>)}/>

);

SecuredAdminRoute.propTypes = {
	security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	security: state.security
})


export default connect(mapStateToProps)(SecuredAdminRoute);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
	render(){
		return (
			<footer className="page-footer font-small">
				<div className="footer-copyright text-center py-3">© 2019 Copyright:{" "}
				    <Link to="http://dss-tennis.com.ua/">dss-tennis.com.ua</Link>
				</div>
			</footer>
		);
	}
}

export default Footer;
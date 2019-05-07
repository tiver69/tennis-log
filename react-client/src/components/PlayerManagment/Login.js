import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { login } from '../../actions/securityActions';

class Login extends Component {

	constructor(){
		super();

		this.state = {
			"username":"",
			"password":"",
			"errors":{}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	onSubmit(e){
		e.preventDefault();
		const loginRequest = {
			username: this.state.username,
			password: this.state.password,
		};
		// console.log(newPlayer);
		this.props.login( loginRequest );
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors:nextProps.errors});
		}
		if (nextProps.security.isTokenValid){
			this.props.history.push("/dashboard");
		}
	}

	render(){

	const {errors} = this.state;

		return (
		<div className="login">
		    <div className="container">
		        <div className="row">
		            <div className="col-md-8 m-auto">
		                <h1 className="display-4 text-center">Log In</h1>
		                <form onSubmit={this.onSubmit}>
		                    <div className="form-group">
		                        <input type="username" className={classnames("form-control form-control-lg",{"is-invalid":errors.username})} placeholder="Username" name="username"
		                        	value={this.state.username} onChange={this.onChange}/>
		                        {
		                        	errors.username && (
		                        		<div className="invalid-feedback">{errors.username}</div>)
		                        }
		                    </div>
		                    <div className="form-group">
		                        <input type="password" className={classnames("form-control form-control-lg",{"is-invalid":errors.password})} placeholder="Password" name="password"
		                        	value={this.state.password} onChange={this.onChange}/>
		                        {
		                        	errors.password && (
		                        		<div className="invalid-feedback">{errors.password}</div>)
		                        }
		                    </div>
		                    <input type="submit" className="btn btn-info btn-block mt-4" />
		                </form>
		            </div>
		        </div>
		    </div>
		</div>
		);
	}
}

const mapStateToProps = state => ({
	security: state.security,
    errors: state.errors
});

Login.propTypes = {
	login: PropTypes.func.isRequired,	
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { login }) (Login);
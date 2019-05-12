import React, { Component } from 'react';
import { createPlayer } from '../../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class Register extends Component {

	componentDidMount(){
		if (this.props.security.isTokenValid && !this.props.security.player.roles.includes("ADMIN")) {
			this.props.history.push("/dashboard");
		}
	};

	constructor(){
		super();

		this.state = {
		    "username": "",
		    "firstName": "",
		    "lastName": "",
		    "password": "",
		    "confirmPassword": "",
		    "birthday": "",
		    "experience": "",
		    "leadingHand": null,
		    "errors": {}
		}

		this.onChange = this.onChange.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangeBirthday = this.onChangeBirthday.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	onChangeLastName(e) {
		this.setState({
			[e.target.name]:e.target.value,
			username:e.target.value.toLowerCase()+(new Date(this.state.birthday).getUTCFullYear()%100 || '1')}
			);
	}

	onChangeBirthday(e) {
		this.setState({
			[e.target.name]:e.target.value,
			username:(this.state.lastName || 'lastName')+(new Date(e.target.value).getUTCFullYear()%100 || '1')}
			);
	}

	onSubmit(e){
		e.preventDefault();
		const newPlayer = {
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			birthday: this.state.birthday,
			experience: this.state.experience,
			leadingHand: this.state.leadingHand,
			roles: []
		};
		console.log(newPlayer);
		this.props.createPlayer( newPlayer, 
			(this.props.security.isTokenValid && this.props.security.player.roles.includes("ADMIN")) ? true : false, 
			this.props.history);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors:nextProps.errors});
		}
	}

	render(){

		const { errors } = this.state;

		return (
		<div className="register">
		        <div className="container">
		            <div className="row">
		                <div className="col-md-8 m-auto">
		                    <h1 className="display-4 text-center">Sign Up</h1>
		                    <p className="lead text-center">Create your Account</p>
		                    <form onSubmit={this.onSubmit}>
		                        <div className="form-group">
		                            <input type="text" className={classnames("form-control form-control-lg",{"is-invalid":errors.firstName})} placeholder="First Name" name="firstName"
		                                value={this.state.firstName} onChange={this.onChange} />
			                        {
			                        	errors.firstName && (
			                        		<div className="invalid-feedback">{errors.firstName}</div>)
			                        }
		                        </div>
		                        <div className="form-group">
		                            <input type="text" className={classnames("form-control form-control-lg",{"is-invalid":errors.lastName})} placeholder="Last Name" name="lastName"
		                                value={this.state.lastName} onChange={this.onChangeLastName} />
				                        {
				                        	errors.lastName && (
				                        		<div className="invalid-feedback">{errors.lastName}</div>)
				                        }
		                        </div>
		                        <div className="form-group">
		                            <input type="date" className={classnames("form-control form-control-lg",{"is-invalid":errors.birthday}, {"is-invalid":errors.experience})} placeholder="Birthday" name="birthday"
		                                value={this.state.birthday||''} onChange={this.onChangeBirthday} />
				                        {
				                        	errors.birthday && (
				                        		<div className="invalid-feedback">{errors.birthday}</div>)
				                        }
				                        {
				                        	errors.experience && (
				                        		<div className="invalid-feedback">{errors.experience}</div>)
				                        }
		                        </div>
		                        <div className="form-group">
		                            <select className="form-control form-control-lg" name="leadingHand"
		                            	value={this.state.leadingHand||'null'} onChange={this.onChange}>
		                                <option value='null'>Select Leading Hand</option>
		                                <option value="Left">Left</option>
		                                <option value="Right">Right</option>
		                            </select>
		                        </div>
		                        <div className="form-group">
		                            <input type="number" className={classnames("form-control form-control-lg",{"is-invalid":errors.experience})} placeholder="Play tennis since" name="experience"
		                                value={this.state.experience} onChange={this.onChange} />
				                        {
				                        	errors.experience && (
				                        		<div className="invalid-feedback">{errors.experience}</div>)
				                        }
		                        </div>
		                        <div className="form-group">
		                        </div>
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
		                        <div className="form-group">
		                            <input type="password" className={classnames("form-control form-control-lg",{"is-invalid":errors.confirmPassword})} placeholder="Confirm Password"
		                                name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange}/>
				                        {
				                        	errors.confirmPassword && (
				                        		<div className="invalid-feedback">{errors.confirmPassword}</div>)
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
    errors: state.errors,
    security: state.security,

});

Register.propTypes = {
	createPlayer: PropTypes.func.isRequired,	
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { createPlayer }) (Register);
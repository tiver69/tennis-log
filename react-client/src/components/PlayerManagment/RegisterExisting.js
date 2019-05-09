import React, { Component } from 'react';
import { getNewPlayer, createPlayer} from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class RegisterExisting extends Component {

	constructor(){
		super();

		this.state={
			"id":"",
		    "username": "",
		    "firstName": "",
		    "lastName": "",
		    "password": "",
		    "confirmPassword": "",
		    "birthday": "",
		    "experience": "",
		    "leadingHand": "",
			"errors": {}
		} 

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	onSubmit(e){
		e.preventDefault();
		const newPlayer = {
			id: this.state.id,
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			birthday: this.state.birthday,
			experience: this.state.experience,
			leadingHand: this.state.leadingHand
		};
		// console.log(newPlayer);
		this.props.createPlayer( newPlayer, this.props.history);
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.errors){
			this.setState({errors:nextProps.errors});
		}

		const {
			id,
		    username,
		    firstName,
		    lastName,
		    password,
		    confirmPassword,
		    birthday,
		    experience,
		    leadingHand,
		} = nextProps.security.player;

		this.setState({
			id,
		    username,
		    firstName,
		    lastName,
		    password,
		    confirmPassword,
		    birthday,
		    experience,
		    leadingHand,
		});
	}

	componentDidMount (){
    	const { playerId } = this.props.match.params;
		this.props.getNewPlayer(playerId);
    };

	render(){
		const { errors } = this.state;	

		const filterErrors = (errors) => {
            	if (errors.idNotFound) {
            		return (
            				<div className="alert alert-danger text" role="alert">
            					{errors.idNotFound}
            				</div>
            			)
            	}
            	else {
                return (
				<div className="register">
		        <div className="container">
		            <div className="row">
		                <div className="col-md-8 m-auto">
		                    <h1 className="display-4 text-center">Sign Up</h1>
		                    <p className="lead text-center">As {this.state.lastName} {this.state.firstName}
		                    </p>
		                    <form onSubmit={this.onSubmit}>
		                        <div className="form-group">
		                            <input type="date" className={classnames("form-control form-control-lg",{"is-invalid":errors.birthday})} placeholder="Age" name="birthday"
		                                value={this.state.birthday} onChange={this.onChange} />
				                        {
				                        	errors.birthday && (
				                        		<div className="invalid-feedback">{errors.birthday}</div>)
				                        }
		                        </div>
		                        <div className="form-group">
		                            <select className="form-control form-control-lg" name="leadingHand"
		                            	value={this.state.leadingHand || ''} onChange={this.onChange}>
		                                <option value="">Select Leading Hand</option>
		                                <option value="Left">Left</option>
		                                <option value="Right">Right</option>
		                            </select>
		                        </div>
		                        <div className="form-group">
		                            <input type="number" className="form-control form-control-lg" placeholder="Play tennis since" name="experience"
		                                value={this.state.experience || ''} onChange={this.onChange} />
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
		                            	value={this.state.password || ''} onChange={this.onChange}/>
				                        {
				                        	errors.password && (
				                        		<div className="invalid-feedback">{errors.password}</div>)
				                        }
		                        </div>
		                        <div className="form-group">
		                            <input type="password" className={classnames("form-control form-control-lg",{"is-invalid":errors.confirmPassword})} placeholder="Confirm Password"
		                                name="confirmPassword" value={this.state.confirmPassword || ''} onChange={this.onChange}/>
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
    	};

		return (
			<div className="container">
				{filterErrors(errors)}
			</div>
		);
	}
}

RegisterExisting.propTypes = {
	security: PropTypes.object.isRequired,	
	getNewPlayer: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	createPlayer: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    security:state.security,    
    errors: state.errors
})

export default connect(mapStateToProps, {getNewPlayer, createPlayer})(RegisterExisting);
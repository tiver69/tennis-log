import React, { Component } from 'react';
import { getCurrentPlayer, updatePlayer } from '../../actions/playerActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class UpdateExisting extends Component {

	constructor(){
		super();

		this.state={
			"id":"",
		    "username": "",
		    "firstName": "",
		    "lastName": "",
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
			password: "old_pass",
			birthday: this.state.birthday,
			experience: this.state.experience,
			leadingHand: this.state.leadingHand
		};
		// console.log(newPlayer);
		this.props.updatePlayer( newPlayer, this.props.history);
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
		    birthday,
		    experience,
		    leadingHand,
		} = nextProps.player.currentPlayer;

		this.setState({
			id,
		    username,
		    firstName,
		    lastName,
		    password,
		    birthday,
		    experience,
		    leadingHand,
		});
	}

	componentDidMount (){
		this.props.getCurrentPlayer();
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
		                    <h1 className="display-4 text-center">Update Your Account</h1>
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
		                                value={this.state.lastName} onChange={this.onChange} />
				                        {
				                        	errors.lastName && (
				                        		<div className="invalid-feedback">{errors.lastName}</div>)
				                        }
		                        </div>
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

UpdateExisting.propTypes = {
	security: PropTypes.object.isRequired,	
	getCurrentPlayer: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	updatePlayer: PropTypes.func.isRequired,
	player: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security:state.security,    
    errors: state.errors,
    player: state.player,
})

export default connect(mapStateToProps, {getCurrentPlayer, updatePlayer})(UpdateExisting);
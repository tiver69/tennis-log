import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getMatch, createMatch } from '../../../actions/matchActions';
import { getPlayers } from '../../../actions/playerActions';

class UpdateMatch extends Component {

	constructor(){
		super();

		this.state={
			id: "",
			date: "",
			playerOneId: "",
			playerTwoId: "",
			// playerOne: {},
			// playerTwo: {},
			playedStatus: "",
			score: "",
			winner: "",
			errors: {}
		} 

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.errors){
			this.setState({errors:nextProps.errors});
		}

		const {
			id,
			date,
			// playerOne,
			// playerTwo,
			playedStatus,
			score,
			winner,
		} = nextProps.tennisMatch;

		this.setState({
			id,
			date,
			// playerOne,
			// playerTwo,
			playedStatus,
			score,
			winner,
		});

		if(nextProps.tennisMatch.playerOne && nextProps.tennisMatch.playerTwo){
			this.setState({
				playerOneId: nextProps.tennisMatch.playerOne.id,
				playerTwoId: nextProps.tennisMatch.playerTwo.id
			})
		}
	}

	componentDidMount (){
		const {tournamentId} = this.props.match.params;
    	const { matchId } = this.props.match.params;
		this.props.getMatch(matchId, tournamentId, this.props.history);		
        this.props.getPlayers();
    };

    onChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	onSubmit(e){
		e.preventDefault()

		const {tournamentId} = this.props.match.params;

		const updateMatch = {
			id: this.state.id,
			date: this.state.date,
			playerOneId: this.state.playerOneId,
			playerTwoId: this.state.playerTwoId,
			playedStatus: this.state.playedStatus,
			score: this.state.score,
			winner: this.state.winner,
		};
		// console.log(updateMatch);
		this.props.createMatch(this.state.playerOneId, this.state.playerTwoId, tournamentId, updateMatch, this.props.history);
	}

	render(){

		const { players } = this.props.player;	
		const { errors } = this.state;		
		const { tournamentId } = this.props.match.params;

		return (
		<div className="update-match">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8 m-auto">
	                    <Link to={`/tournamentBoard/${tournamentId}`} className="btn btn-light">
	                        Back to Tournament Board
	                    </Link>
	                    <h4 className="display-4 text-center"> Update Match </h4>
	                    <p className="lead text-center">with ID '{this.state.id}'</p>
	                    <form onSubmit={this.onSubmit}>

	                        <div className="form-group">
	                            <select className={classnames("form-control form-control-lg",{"is-invalid":errors.playerOne})} name="playerOneId" value={this.state.playerOneId} onChange={this.onChange}>
	                                <option value="">Select PlayerOne</option>
									{
										players.filter(player => !(player.id === parseInt(this.state.playerTwoId,10))).map(player => (
				                        <option key={player.id} value={player.id}>{player.lastName} {player.firstName}</option>
				                        ))
				                    }
	                            </select>
	                        {
	                        	errors.playerOne && (
	                        		<div className="invalid-feedback">{errors.playerOne}</div>)
	                        }
	                        {
	                        	errors.players && (
	                        		<div className="invalid-feedback">{errors.players}</div>)	                        	
	                        }
	                        </div>

	                        <div className="form-group">
	                            <select className={classnames("form-control form-control-lg",{"is-invalid":errors.playerTwo})} name="playerTwoId" value={this.state.playerTwoId} onChange={this.onChange}>
	                                <option value="">Select PlayerTwo</option>
									{
										players.filter(player => !(player.id === parseInt(this.state.playerOneId))).map(player => (
				                        <option key={player.id} value={player.id}>{player.lastName} {player.firstName}</option>
				                        ))
				                    }
	                            </select>	
	                        {
	                        	errors.playerTwo && (
	                        		<div className="invalid-feedback">{errors.playerTwo}</div>)
	                        }
	                        {
	                        	errors.players && (
	                        		<div className="invalid-feedback">{errors.players}</div>)	                        	
	                        }                            
	                        </div>

	                        <div className="form-group">
	                            <input type="text" className={classnames("form-control form-control-lg",{"is-invalid":errors.score})} name="score" placeholder="score" value={this.state.score|| ''} onChange={this.onChange}/>
	                        {
	                        	errors.score && (
	                        		<div className="invalid-feedback">{errors.score}</div>)
	                        }
	                        </div>
	                        <h6> Date</h6>
	                        <div className="form-group">
	                            <input type="date" className="form-control form-control-lg" name="date" value={this.state.date || ''} onChange={this.onChange}/>
	                        </div>
	                        <div className="form-group">
	                            <select className={classnames("form-control form-control-lg",{"is-invalid":errors.winner})} name="winner" value={this.state.winner || ''} onChange={this.onChange}>
	                                <option value="">Select Winner</option>
	                                <option value="true">Player One</option>
	                                <option value="false">Player Two</option>
	                            </select>
		                        {
		                        	errors.winner && (
		                        		<div className="invalid-feedback">{errors.winner}</div>)
		                        }
	                        </div>
	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="playedStatus" value={this.state.playedStatus|| ''} onChange={this.onChange}>
	                                <option value="">Select Status</option>
	                                <option value="false">SHEADULED</option>
	                                <option value="true">FINNISHED</option>
	                            </select>
	                        </div>

	                        <input type="submit" className="btn btn-primary btn-block mt-4" />
	                    </form>
	                </div>
	            </div>
	        </div>
	    </div>
		);
	}
}

UpdateMatch.propTypes = {
	getMatch: PropTypes.func.isRequired,
	tennisMatch: PropTypes.object.isRequired,	
	getPlayers: PropTypes.func.isRequired,		
	createMatch: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	tennisMatch: state.tennisMatch.tennisMatch,
    player:state.player,    
    errors: state.errors
})

export default connect (mapStateToProps, { getMatch, createMatch, getPlayers })(UpdateMatch);
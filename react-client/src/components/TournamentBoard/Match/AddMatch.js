import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { createMatch } from '../../../actions/matchActions';
import { getPlayers } from '../../../actions/playerActions';
import { getTournament } from '../../../actions/tournamentActions';
import PropTypes from 'prop-types';

class AddMatch extends Component {

	constructor(props) {
		super(props)
		const {tournamentId} = this.props.match.params;

		this.state = {
			date: "",
			playerOneId: "",
			playerTwoId: "",
			playedStatus: "",
			score: "",
			winner: "",
			tournamentId: tournamentId,
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
			name,
		} = nextProps.tournament;

		this.setState({
			name,
		});
	}

    componentDidMount (){
        this.props.getPlayers();        
		this.props.getTournament(this.state.tournamentId, this.props.history);
    }

	onChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	onSubmit(e){
		e.preventDefault();
		const newMatch = {
			date: this.state.date,
			playerOneId: this.state.playerOneId,
			playerTwoId: this.state.playerTwoId,
			playedStatus: this.state.playedStatus,
			score: this.state.score,
			winner: this.state.winner,
		};
		// console.log(newMatch);
		this.props.createMatch(this.state.playerOneId, this.state.playerTwoId, this.state.tournamentId, newMatch, this.props.history);
	}

	render(){

		const { players } = this.props.player;
		const { tournamentId } = this.props.match.params;
		const { errors } = this.state;

		return (
	    <div className="add-match">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8 m-auto">
	                    <Link to={`/tournamentBoard/${tournamentId}`} className="btn btn-light">
	                        Back to Tournament Board
	                    </Link>
	                    <h4 className="display-4 text-center"> Add Match</h4>
	                    <p className="lead text-center">for {this.state.name}</p>
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
	                            <input type="text" className={classnames("form-control form-control-lg",{"is-invalid":errors.score})} name="score" placeholder="score" value={this.state.score} onChange={this.onChange}/>
	                        {
	                        	errors.score && (
	                        		<div className="invalid-feedback">{errors.score}</div>)
	                        }
	                        </div>
	                        <h6> Date</h6>
	                        <div className="form-group">
	                            <input type="date" className="form-control form-control-lg" name="date" value={this.state.date} onChange={this.onChange}/>
	                        </div>
	                        <div className="form-group">
	                            <select className={classnames("form-control form-control-lg",{"is-invalid":errors.winner})} name="winner" value={this.state.winner} onChange={this.onChange}>
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
	                            <select className="form-control form-control-lg" name="playedStatus" value={this.state.playedStatus} onChange={this.onChange}>
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

const mapStateToProps = state => ({
	tournament: state.tournament.tournament,
    player:state.player,
    errors: state.errors
});

AddMatch.propTypes = {
	createMatch: PropTypes.func.isRequired,
	getPlayers: PropTypes.func.isRequired,	
	errors: PropTypes.object.isRequired,
	getTournament: PropTypes.func.isRequired,
	tournament: PropTypes.object.isRequired,
};

export default connect (mapStateToProps, { createMatch, getPlayers, getTournament }) (AddMatch);
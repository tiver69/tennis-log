import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { createMatch } from '../../../actions/matchActions';
import { getPlayers } from '../../../actions/playerActions';
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
			status: "",
			tournamentId: tournamentId,
			errors: {}
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

    componentDidMount (){
        this.props.getPlayers();
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
			status: this.state.status,
		};
		// console.log(newMatch);
		this.props.createMatch(this.state.playerOneId, this.state.playerTwoId, this.state.tournamentId, newMatch, this.props.history);
	}

	render(){

		const { players } = this.props.player;
		const {tournamentId} = this.props.match.params;

		return (
	    <div className="add-match">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8 m-auto">
	                    <Link to={`/tournamentBoard/${tournamentId}`} className="btn btn-light">
	                        Back to Tournament Board
	                    </Link>
	                    <h4 className="display-4 text-center"> Add Match</h4>
	                    <p className="lead text-center">for {tournamentId}</p>
	                    <form onSubmit={this.onSubmit}>

	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="playerOneId" value={this.state.playerOneId} onChange={this.onChange}>
	                                <option value="">Select PlayerOne</option>
									{
										players.filter(player => !(player.id === parseInt(this.state.playerTwoId,10))).map(player => (
				                        <option key={player.id} value={player.id}>{player.lastName} {player.firstName}</option>
				                        ))
				                    }
	                            </select>
	                        </div>

	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="playerTwoId" value={this.state.playerTwoId} onChange={this.onChange}>
	                                <option value="">Select PlayerTwo</option>
									{
										players.filter(player => !(player.id === parseInt(this.state.playerOneId))).map(player => (
				                        <option key={player.id} value={player.id}>{player.lastName} {player.firstName}</option>
				                        ))
				                    }
	                            </select>
	                        </div>

	                        <div className="form-group">
	                            <input type="text" className="form-control form-control-lg" name="score" placeholder="score" value={this.state.score} onChange={this.onChange}/>
	                        </div>
	                        <h6> Date</h6>
	                        <div className="form-group">
	                            <input type="date" className="form-control form-control-lg" name="date" value={this.state.date} onChange={this.onChange}/>
	                        </div>
	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="winner" value={this.state.winner} onChange={this.onChange}>
	                                <option value="">Select Winner</option>
	                                <option value="true">Player One</option>
	                                <option value="false">Player Two</option>
	                            </select>
	                        </div>

	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="status" value={this.state.status} onChange={this.onChange}>
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
    player:state.player

});

AddMatch.propTypes = {
	createMatch: PropTypes.func.isRequired,
	getPlayers: PropTypes.func.isRequired
};

export default connect (mapStateToProps, { createMatch, getPlayers }) (AddMatch);
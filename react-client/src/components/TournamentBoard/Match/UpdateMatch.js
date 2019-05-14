import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getMatch, createMatch } from '../../../actions/matchActions';
import { getTournament } from '../../../actions/tournamentActions';
import { getPlayers } from '../../../actions/playerActions';

class UpdateMatch extends Component {

	constructor(){
		super();

		this.state={
			id: "",
			date: "",
			playerOneId: "",
			playerTwoId: "",
			playedStatus: "false",
			score: "0:0",
			errors: {},
			winner: "true",
			set1Player1:"0",
			set1Player2:"0",
			set2Player1:"0",
			set2Player2:"0",			
			set3Player1:"0",
			set3Player2:"0",
			set4Player1:"0",
			set4Player2:"0",
			set5Player1:"0",
			set5Player2:"0"
		} 

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onScoreChange = this.onScoreChange.bind(this);
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.errors){
			this.setState({errors:nextProps.errors});
		}

		const {
			id,
			date,
			playedStatus,
			score,
		} = nextProps.tennisMatch;

		this.setState({
			id,
			date,
			playedStatus,
			score,
		});

		if(nextProps.tennisMatch.playerOne && nextProps.tennisMatch.playerTwo){
			this.setState({
				playerOneId: nextProps.tennisMatch.playerOne.id,
				playerTwoId: nextProps.tennisMatch.playerTwo.id
			})
		};

		if (nextProps.tennisMatch.score) {
			var res = this.state.score.split(/:| /);
			this.setState({
				set1Player1 : res[0],
				set1Player2 : res[1]
			});
			if (res[2])
			this.setState({
				set2Player1 : res[2],
				set2Player2 : res[3]
			});
			if (res[4])
			this.setState({
				set2Player1 : res[4],
				set2Player2 : res[5]
			});
			if (res[6])
			this.setState({
				set2Player1 : res[6],
				set2Player2 : res[7]
			});
			if (res[8])
			this.setState({
				set2Player1 : res[8],
				set2Player2 : res[9]
			});
		}
		// console.log(res);
	}

	componentDidMount (){
		const {tournamentId} = this.props.match.params;
    	const { matchId } = this.props.match.params;
		this.props.getMatch(matchId, tournamentId, this.props.history);		
        this.props.getPlayers();
        this.props.getTournament(tournamentId, this.props.history);
    };

    onChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	async onScoreChange(e) {	
		await this.setState({[e.target.name]:e.target.value});
		let final = this.state.set1Player1+":"+this.state.set1Player2;
		if (this.state.set2Player1 !== "0" || this.state.set2Player2 !== "0")
			final = final + " " + this.state.set2Player1+":"+this.state.set2Player2;
		if (this.state.set3Player1 !== "0" || this.state.set3Player2 !== "0")
			final = final + " " + this.state.set3Player1+":"+this.state.set3Player2;
		if (this.state.set4Player1 !== "0" || this.state.set4Player2 !== "0")
			final = final + " " + this.state.set4Player1+":"+this.state.set4Player2;
		if (this.state.set5Player1 !== "0" || this.state.set5Player2 !== "0")
			final = final + " " + this.state.set5Player1+":"+this.state.set5Player2;
		await this.setState({score:final});

		let PlayerOneScore = Number(this.state.set1Player1) +
		Number(this.state.set2Player1) +
		Number(this.state.set3Player1) +
		Number(this.state.set4Player1) +
		Number(this.state.set5Player1);

		let PlayerTwoScore = Number(this.state.set1Player2) +
		Number(this.state.set2Player2) +
		Number(this.state.set3Player2) +
		Number(this.state.set4Player2) +
		Number(this.state.set5Player2);

		if (PlayerOneScore+PlayerTwoScore !== 0) 
			await this.setState({playedStatus:true});
		else			
			await this.setState({playedStatus:false});
		if(PlayerOneScore > PlayerTwoScore)
			await this.setState({winner:true});
		if(PlayerOneScore < PlayerTwoScore)
			await this.setState({winner:false});
		if (PlayerTwoScore === PlayerOneScore)			
			await this.setState({winner:""});

		// console.log(this.state.winner==="");
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
		};
		// console.log(updateMatch);
		this.props.createMatch(this.state.playerOneId, this.state.playerTwoId, tournamentId, updateMatch, this.props.history);
	}

	render(){

		const { players } = this.props.player;	
		const { errors } = this.state;		
		const { tournamentId } = this.props.match.params;
		const { tournament } =this.props.tournament;

		const set = (number) => {

			let val1;
			let val2;
			switch (number) {
				case 1:
					val1 = this.state.set1Player1;
					val2 = this.state.set1Player2;
					break;
				case 2:
					val1 = this.state.set2Player1;
					val2 = this.state.set2Player2;
					break;
				case 3:
					val1 = this.state.set3Player1;
					val2 = this.state.set3Player2;
					break;
				case 4:
					val1 = this.state.set4Player1;
					val2 = this.state.set4Player2;
					break;
				case 5:
					val1 = this.state.set5Player1;
					val2 = this.state.set5Player2;
					break;

				default:
					break;
			}

			return (
				<React.Fragment>
				Set - {" "}
				<input type="number" min="0" className="form-group w-25" name={"set"+number+"Player1"} placeholder="0" 
					value={val1} onChange={this.onScoreChange}/>{" : "}
				<input type="number" min="0" className="form-group w-25" name={"set"+number+"Player2"} placeholder="0"
					value={val2} onChange={this.onScoreChange}/>
				<br/>
				</React.Fragment>
			);
		}

		return (
		<div className="update-match">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8 m-auto">
	                    <Link to={`/tournamentBoard/${tournamentId}`} className="btn btn-light">
	                        Back to {tournament.name}
	                    </Link>
	                    <h4 className="display-4 text-center"> Update Match</h4><p/>
	                    <form onSubmit={this.onSubmit}>

	                        <div className="form-group form-inline">
	                            <select className={classnames("form-control form-control-lg w-50",{"is-invalid":errors.playerOne},{"btn-success":(this.state.winner !== "" && this.state.winner)})} name="playerOneId" value={this.state.playerOneId} onChange={this.onChange}>
	                                <option value="">Select PlayerOne</option>
									{
										players.filter(player => !(player.id === parseInt(this.state.playerTwoId,10))).map(player => (
				                        <option key={player.id} value={player.id}>{player.lastName} {player.firstName}</option>
				                        ))
				                    }
	                            </select>

	                            <select className={classnames("form-control form-control-lg w-50",{"is-invalid":errors.playerTwo},{"btn-success":(this.state.winner !== "" && !this.state.winner)})} name="playerTwoId" value={this.state.playerTwoId} onChange={this.onChange}>
	                                <option value="">Select PlayerTwo</option>
									{
										players.filter(player => !(player.id === parseInt(this.state.playerOneId))).map(player => (
				                        <option key={player.id} value={player.id}>{player.lastName} {player.firstName}</option>
				                        ))
				                    }
	                            </select>
								{
		                        	errors.playerOne && (
		                        		<div className="invalid-feedback w-50">{errors.playerOne}</div>)
		                        }
		                        {
		                        	errors.playerTwo && (
		                        		<div className="invalid-feedback w-50">{errors.playerTwo}</div>)
		                        }	                            
	                        </div>

	                        <div className="form-group">
	                            <input type="text" className={classnames("form-control form-control-lg text-center",{"is-invalid":errors.score})} name="score" placeholder="score" value={this.state.score} onChange={this.onChange} disabled/>
	                        {
	                        	errors.score && (
	                        		<div className="invalid-feedback">{errors.score}</div>)
	                        }
	                        </div>

	                        <div className="form-group text-center" onChange={this.onScoreChange}>
	                        	{
	                        		set(1)
	                        	}
								{
									((this.state.set1Player1!=="0" || this.state.set1Player2!=="0") ||
									(this.state.set2Player1!=="0" || this.state.set2Player2!=="0")) &&
									set(2)
								}
								{
									((this.state.set2Player1!=="0" || this.state.set2Player2!=="0") ||
									(this.state.set3Player1!=="0" || this.state.set3Player2!=="0")) &&
									set(3)
								}
								{
									((this.state.set3Player1!=="0" || this.state.set3Player2!=="0") ||
									(this.state.set4Player1!=="0" || this.state.set4Player2!=="0")) &&
									set(4)
								}
								{
									((this.state.set4Player1!=="0" || this.state.set4Player2!=="0") ||
									(this.state.set5Player1!=="0" || this.state.set5Player2!=="0")) &&
									set(5)
								}
	                        </div>

	                        <h6> Date</h6>
	                        <div className="form-group">
	                            <input type="date" className="form-control form-control-lg" name="date" value={this.state.date || ''} onChange={this.onChange}/>
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
	getTournament: PropTypes.func.isRequired,
	getPlayers: PropTypes.func.isRequired,		
	createMatch: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	tennisMatch: state.tennisMatch.tennisMatch,
    player:state.player,    
    errors: state.errors,
    tournament: state.tournament
})

export default connect (mapStateToProps, { getMatch, createMatch, getPlayers, getTournament })(UpdateMatch);
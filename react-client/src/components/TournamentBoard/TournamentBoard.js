import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getTournamentMatches } from '../../actions/matchActions';
import { getRoundTournament, getTournamentPlayers, getTournament } from '../../actions/tournamentActions';
import RoundTournamentBoard from './RoundTournamentBoard';
import MatchTournamentBoard from './MatchTournamentBoard';

class TournamentBoard extends Component {

	constructor(){
		super();
		this.state = {
			displayRound: true,
			errors: {}
		};
	}

	onDisplayMatchClick = (e) =>{
		this.setState({
			displayRound:false
		});
    }

    onDisplayRoundClick = (e) =>{
		this.setState({
			displayRound:true
		});
    }

	componentDidMount (){
    	const { tournamentId } = this.props.match.params;
		this.props.getTournamentMatches(tournamentId);
		this.props.getRoundTournament(tournamentId);
		this.props.getTournament(tournamentId, this.props.history, false);
		this.props.getTournamentPlayers(tournamentId);
    };

    componentWillReceiveProps(nextProps) {
    	if (nextProps.errors) {
    		this.setState({errors:nextProps.errors});
    	}
    }

	render(){

		const { tournamentId } = this.props.match.params;
		const { matches } = this.props.tennisMatch;
		const { roundResult } = this.props.tournament;
		const { tournamentPlayers } = this.props.tournament;
		const { security } = this.props;
		const { errors } = this.state;

        const ViewModeButtons = () => {
			return (
				<div className="form-group container">
			        <div className="row d-flex justify-content-between">
			        	{CreateMatchButton(this.props.security.player.roles.includes("ADMIN"))}
			        	<div className={classnames({"w-100":!this.props.security.player.roles.includes("ADMIN")},{"w-75":this.props.security.player.roles.includes("ADMIN")})}>
		                <button className={classnames("bt btn w-50",{"btn-primary":!this.state.displayRound},{"border-primary":this.state.displayRound})}
		                	onClick={this.onDisplayMatchClick.bind(this)}>
		                    Match Mode
		                </button>
		                <button className={classnames("bt btn w-50",{"btn-primary":this.state.displayRound},{"border-primary":!this.state.displayRound})}
		                	onClick={this.onDisplayRoundClick.bind(this)}>
		                    Round Mode
		                </button>
		                </div>
			        </div>
			    </div>
			);
		}

		const CreateMatchButton = (view) => {
			if (view) {
			return (
				<React.Fragment>
                	<Link to={`/addMatch/${tournamentId}`} className="btn btn-primary mb-3">
			     		<i className="fas fa-plus-circle"> Create Match </i>
					</Link>
					<br />
	            </React.Fragment>
			);
			}
		}

        return (
		<div className="container">
		<h1 className="card-title text-center">{this.props.tournament.tournament.name}</h1>
		{
			ViewModeButtons()
		}
		{
			errors.idNotFound &&
            <div className="alert alert-danger text" role="alert">
            	{errors.idNotFound}
            </div>
		}
		{
			!errors.idNotFound && this.state.displayRound &&
			<RoundTournamentBoard roundResult={roundResult} players={tournamentPlayers}/>
		}
		<hr />
		{
			!errors.idNotFound && !this.state.displayRound &&
			<MatchTournamentBoard errors={errors} matches={matches} tournamentId={tournamentId} security={security}/>
		}
        </div>
		);
	}
}

const mapStateToProps = state => ({
    errors: state.errors,    
	tennisMatch: state.tennisMatch,
	security: state.security,	
	tournament: state.tournament
});

TournamentBoard.propTypes = {
	getTournamentMatches: PropTypes.func.isRequired,
	getRoundTournament: PropTypes.func.isRequired,
	getTournament: PropTypes.func.isRequired,
	getTournamentPlayers: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired
};

export default connect (mapStateToProps, { getTournamentMatches, getRoundTournament, getTournamentPlayers, getTournament }) (TournamentBoard);
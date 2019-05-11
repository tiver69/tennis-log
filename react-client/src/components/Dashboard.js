import React, { Component } from 'react';
import TournamentItem from './Tournament/TournamentItem';
import { connect } from 'react-redux';
import { getTournaments } from '../actions/tournamentActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class Dashboard extends Component {

    componentDidMount (){
        this.props.getTournaments();
    }

	render(){

    const { tournaments } = this.props.tournament;
    const { player } = this.props.security;

    const CreateTournamentButton = (view) => {
        if (view) {
        return (
            <React.Fragment>
            <Link to="/addTournament" className="btn btn-lg btn-info">
                Create a Tournament
            </Link>
            </React.Fragment>
        );
        }
    }

	return (
    <div className="projects">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Tournaments</h1>
                    {CreateTournamentButton(player.roles.includes("ADMIN"))}
                    <hr />
                    {tournaments.map(tournament => (
                        <TournamentItem key={tournament.id} tournament={tournament} roles={player.roles}/>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>

	);
	}
}

Dashboard.propTypes = {
    tournament: PropTypes.object.isRequired,    
    security: PropTypes.object.isRequired,
    getTournaments: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    tournament:state.tournament,
    security: state.security
});

export default connect(mapStateToProps, {getTournaments}) (Dashboard);

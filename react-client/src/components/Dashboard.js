import React, { Component } from 'react';
import TournamentItem from './Tournament/TournamentItem';
import CreateTournamentButton from './Tournament/CreateTournamentButton';
import { connect } from 'react-redux';
import { getTournaments } from '../actions/tournamentActions';
import PropTypes from 'prop-types';


class Dashboard extends Component {

    componentDidMount (){
        this.props.getTournaments();
    }

	render(){

    const { tournaments } = this.props.tournament;

	return (
    <div className="projects">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Tournaments</h1>
                    <br />
                        <CreateTournamentButton/>
                    <br />
                    <hr />
                    {tournaments.map(tournament => (
                        <TournamentItem key={tournament.id} tournament={tournament} />
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
    getTournaments: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    tournament:state.tournament

});

export default connect(mapStateToProps, {getTournaments}) (Dashboard);

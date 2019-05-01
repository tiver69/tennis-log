import React, { Component } from 'react';
import TournamentItem from './Tournament/TournamentItem';
import CreateTournamentButton from './Tournament/CreateTournamentButton';


class Dashboard extends Component {
	render(){
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
                    <TournamentItem />
                </div>
            </div>
        </div>
    </div>

	);
	}
}

export default Dashboard;

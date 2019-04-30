import React, { Component } from 'react';
import TournamentItem from './Tournament/TournamentItem';


class Dashboard extends Component {
	render(){
	return (
    <div className="projects">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Tournaments</h1>
                    <br />
                    <a href="ProjectForm.html" className="btn btn-lg btn-info">
                        Create a Tournament
                    </a>
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

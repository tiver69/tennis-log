import React, { Component } from 'react';
import MatchItem from './Match/MatchItem';

class MatchTournamentBoard extends Component {
	render(){

		const { errors } = this.props;
		const { matches } = this.props;
		const {tournamentId} = this.props;

		let sheduled = []
        let finished = []

		const filterMatches = (errors, matches) => {
            if (matches.length < 1){
            	if (errors.idNotFound)
            		return ("");
            	else {
                return (
                	<React.Fragment>
                    <div className="alert alert-info text-center" role="alert">
                    No matches here. 
                    </div>
                    </React.Fragment>
                    )
            	}
       		}
            else {
                const tennisMatches = matches.map(tennisMatch => (
                    <MatchItem key={tennisMatch.id} tennisMatch={tennisMatch} tournamentId={tournamentId}
                    	viewMode={!this.props.security.player.roles.includes("ADMIN")} />
                ));

                for(let i=0; i<tennisMatches.length; i++){
                    if ((tennisMatches[i].props.tennisMatch.playedStatus).toString() === "false"){
                        sheduled.push(tennisMatches[i])
                    }
                    if ((tennisMatches[i].props.tennisMatch.playedStatus).toString() === "true"){
                        finished.push(tennisMatches[i])
                    }
                }

			return (
				<React.Fragment>
			        <div className="container">
			            <div className="row">
			                <div className="col-md-6">
			                    <div className="card text-center mb-2">
			                        <div className="card-header bg-secondary text-white">
			                            <h3>SCHEDULED ({sheduled.length})</h3>
			                        </div>
			                    </div>

		                    {
		                    	sheduled
		                    }
			                </div>
			                <div className="col-md-6">
			                    <div className="card text-center mb-2">
			                        <div className="card-header bg-success text-white">
			                            <h3>FINNISHED ({finished.length})</h3>
			                        </div>
			                    </div>
			                {
			                	finished
			                }
			                </div>

			            </div>
			        </div>
			    </React.Fragment>
			);
			}
		};

		return (
			<div>
			{
				filterMatches(errors, matches)
			}
			</div>
		);
	}
}

export default MatchTournamentBoard;
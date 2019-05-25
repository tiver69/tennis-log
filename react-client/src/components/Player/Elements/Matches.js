import React, { Component } from 'react';
import MatchItem from '../../TournamentBoard/Match/MatchItem';

class Matches extends Component {

	render(){

		const { currentPlayerMatches } = this.props;

		let sheduled = []
        let finished = []

        const filterMatches = (currentPlayerMatches) => {
            const tennisMatches = currentPlayerMatches.map(tennisMatch => (
                <MatchItem key={tennisMatch.id} tennisMatch={tennisMatch} viewMode={true} />
            ));

            for(let i=0; i<tennisMatches.length; i++){
                if ((tennisMatches[i].props.tennisMatch.playedStatus).toString() === "false"){
                    sheduled.push(tennisMatches[i])
                }
                if ((tennisMatches[i].props.tennisMatch.playedStatus).toString() === "true"){
                    finished.push(tennisMatches[i])
                }
            };

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
			)
        };

		return (
			<React.Fragment>
				{
					filterMatches(currentPlayerMatches)
				}
			</React.Fragment>
		);
	}
}

export default Matches;
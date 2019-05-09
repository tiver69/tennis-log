import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MatchItem from './Match/MatchItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTournamentMatches } from '../../actions/matchActions';

class TournamentBoard extends Component {

	constructor(){
		super();
		this.state = {
			errors: {}
		};
	}

	componentDidMount (){
    	const { tournamentId } = this.props.match.params;
		this.props.getTournamentMatches(tournamentId);
    };

    componentWillReceiveProps(nextProps) {
    	if (nextProps.errors) {
    		this.setState({errors:nextProps.errors});
    	}
    }

	render(){

		const { tournamentId } = this.props.match.params;
		const { matches } = this.props.tennisMatch;
		const { errors } = this.state;

		let BoardContent;
		let sheduled = []
        let finished = []

        const filterMatches = (errors, matches) => {
            if (matches.length < 1){
            	if (errors.idNotFound) {
            		return (
            				<div className="alert alert-danger text" role="alert">
            					{errors.idNotFound}
            				</div>
            			)
            	}
            	else {
                return (
                	<React.Fragment>
                	<Link to={`/addMatch/${tournamentId}`} className="btn btn-primary mb-3">
			     		<i className="fas fa-plus-circle"> Create Match </i>
					</Link>
					<br />
					<hr />
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
					<Link to={`/addMatch/${tournamentId}`} className="btn btn-primary mb-3">
					     <i className="fas fa-plus-circle"> Create Match </i>
					</Link>
					<br />
					<hr />
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

        BoardContent = filterMatches(errors, matches);

        return (
		<div className="container">
        {BoardContent}
        {
        	// matches.map(tennisMatch => (
         //    <MatchItem key={tennisMatch.id} tennisMatch={tennisMatch} />
       		//  ))
        }
        </div>
		);
	}
}

const mapStateToProps = state => ({
    errors: state.errors,    
	tennisMatch: state.tennisMatch,
	security: state.security
});

TournamentBoard.propTypes = {
	getTournamentMatches: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired
};

export default connect (mapStateToProps, { getTournamentMatches }) (TournamentBoard);
import React, { Component } from 'react';
import { getCurrentPlayer, getCurrentPlayerMatches } from '../../actions/playerActions';
import MatchItemView from '../TournamentBoard/Match/MatchItemView';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PlayerPage extends Component {

	componentDidMount (){
		this.props.getCurrentPlayer();
		this.props.getCurrentPlayerMatches();
    };

	render(){

		const { currentPlayer } = this.props.currentPlayer;
		const { currentPlayerMatches } = this.props.currentPlayer;

		let sheduled = []
        let finished = []

        function calculate_age(dob) { 
	    	var diff_ms = Date.now() - dob.getTime();
	   		var age_dt = new Date(diff_ms); 
	  
	   		return Math.abs(age_dt.getUTCFullYear() - 1970);
		}

        const filterMatches = (currentPlayerMatches) => {
            if (currentPlayerMatches.length < 1){
            	return (
            		<div className="alert alert-danger text" role="alert">
            			You dont have matches yet
            		</div>
            	)
            }
        	else {
                const tennisMatches = currentPlayerMatches.map(tennisMatch => (
                    <MatchItemView key={tennisMatch.id} tennisMatch={tennisMatch} />
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
			)
			}
        };

		return (
			<div className="card mb-1 bg-light">
                <Link to={"/account/update/"} className="btn btn-primary">
                    Update
                </Link>
                <div className="text-center card-header text-primary">
                	{currentPlayer.firstName} {currentPlayer.lastName} - {currentPlayer.birthday}{" "} 
                	({calculate_age(new Date(currentPlayer.birthday))} years) 
                </div>
                <div className="card-body bg-light text-center">
                    <h5 className="card-title">{currentPlayer.leadingHand}-handed</h5>
                    <p className="card-text text-truncate text-right">
                        In tennis for {calculate_age(new Date(currentPlayer.experience))} years
                    </p>
                </div>
                {filterMatches(currentPlayerMatches)}
            </div>
		);
	}
}

const mapStateToProps = state => ({
    errors: state.errors,
    currentPlayer: state.player,

});

PlayerPage.propTypes = {
	getCurrentPlayer: PropTypes.func.isRequired,
	getCurrentPlayerMatches: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	currentPlayer: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getCurrentPlayer, getCurrentPlayerMatches} )(PlayerPage);
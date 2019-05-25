import React, { Component } from 'react';
import { getCurrentPlayer, getCurrentPlayerMatches, getCurrentPlayerStatistic } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Charts from './Elements/Charts';
import Matches from './Elements/Matches';

class PlayerPage extends Component {

	constructor() {
		super();

		this.state = {
			displayMatches: true
		}
	}

	componentDidMount (){
		this.props.getCurrentPlayer();
		this.props.getCurrentPlayerMatches();
		this.props.getCurrentPlayerStatistic();
    };

    onDisplayMatchesClick = (e) =>{
		this.setState({
			displayMatches:true
		});
    }

    onDisplayStatisticClick = (e) =>{
		this.setState({
			displayMatches:false
		});
    }

	render(){

		const { currentPlayer } = this.props.security;
		const { currentPlayerMatches } = this.props.security;
		const { currentPlayerStatistic } = this.props.security;

        function calculate_age(dob) { 
	    	var diff_ms = Date.now() - dob.getTime();
	   		var age_dt = new Date(diff_ms); 
	  
	   		return Math.abs(age_dt.getUTCFullYear() - 1970);
		}

		return (
			<div className="card mb-1 bg-light">
                <div className="text-center card-header text-primary d-flex justify-content-between bd-highlight mb-3">
	                <Link to={"/account/update/"} className="btn btn-primary w-25">
	                    Update
	                </Link>
	                <div className="p-2 bd-highlight">
	                	{currentPlayer.firstName} {currentPlayer.lastName} - {currentPlayer.birthday}{" "} 
	                	({calculate_age(new Date(currentPlayer.birthday))} years) 
                	</div>
                	<div className="w-25" />
                </div>
                <div className="card-body bg-light text-center">
                    <h5 className="card-title">{currentPlayer.leadingHand}-handed</h5>
                    <p className="card-text text-truncate text-right">
                        In tennis for {calculate_age(new Date(currentPlayer.experience,1,1))} years
                    </p>
                </div>                
			    <hr />
				<div className="form-group container">
			        <div className="row">
		                <button className={classnames("bt btn w-50",{"btn-primary":this.state.displayMatches},{"border-primary":!this.state.displayMatches})}
		                	onClick={this.onDisplayMatchesClick.bind(this)}>
		                    Matches
		                </button>
		                <button className={classnames("bt btn w-50",{"btn-primary":!this.state.displayMatches},{"border-primary":this.state.displayMatches})}
		                	onClick={this.onDisplayStatisticClick.bind(this)}>
		                    Statistic
		                </button>
			        </div>
			    </div>
			
				{
					(currentPlayerMatches.length < 1) &&
					<div className="alert alert-danger text" role="alert">
            			You dont have matches yet
            		</div>
            	}
                {!(currentPlayerMatches.length < 1) && this.state.displayMatches && 
                	<Matches currentPlayerMatches={currentPlayerMatches}/>}
                {!(currentPlayerMatches.length < 1) && !this.state.displayMatches && 
                	<Charts currentPlayerStatistic={currentPlayerStatistic}/>
                }
            </div>
		);
	}
}

const mapStateToProps = state => ({
    errors: state.errors,
    currentPlayer: state.player,
    security: state.security
});

PlayerPage.propTypes = {
	getCurrentPlayer: PropTypes.func.isRequired,
	getCurrentPlayerMatches: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	currentPlayer: PropTypes.object.isRequired,
	getCurrentPlayerStatistic: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {getCurrentPlayer, getCurrentPlayerMatches, getCurrentPlayerStatistic} )(PlayerPage);
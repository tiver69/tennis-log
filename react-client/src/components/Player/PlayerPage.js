import React, { Component } from 'react';
import { getCurrentPlayer, getCurrentPlayerMatches, getCurrentPlayerStatistic } from '../../actions/securityActions';
import MatchItem from '../TournamentBoard/Match/MatchItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Chart } from "react-google-charts";
import classnames from 'classnames';

class PlayerPage extends Component {

	constructor() {
		super();

		this.state = {
			displayMatches: true,
     		chartData:null
		}
	}

	componentDidMount (){
		this.props.getCurrentPlayer();
		this.props.getCurrentPlayerMatches();
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

		this.props.getCurrentPlayerStatistic();
    }

    getPlayerStatisticForChart = (currentPlayerStatistic) =>{
		// const { currentPlayerStatistic } = this.props.security;
	    var currentPlayerStatisticKeys = Object.keys(currentPlayerStatistic);
		let output = [['Player', 'Win', 'Lose']];
		currentPlayerStatisticKeys.map((keys) => {
			if (keys !== "general")
				output.push([keys, currentPlayerStatistic[keys]["win"], currentPlayerStatistic[keys]["lose"]]);
				// console.log(keys, currentPlayerStatistic[keys]["winner"], currentPlayerStatistic[keys]["lose"]);
			return "";
		});
		// console.log(output);
		return(output);
		}

	render(){

		const { currentPlayer } = this.props.security;
		const { currentPlayerMatches } = this.props.security;

		let sheduled = []
        let finished = []

        function calculate_age(dob) { 
	    	var diff_ms = Date.now() - dob.getTime();
	   		var age_dt = new Date(diff_ms); 
	  
	   		return Math.abs(age_dt.getUTCFullYear() - 1970);
		}

		const filterStatistic = () => {
			const { currentPlayerStatistic } = this.props.security;
			const { currentPlayerMatches } = this.props.security;

			if (currentPlayerMatches.length < 1){
            	return (
            		<div className="alert alert-danger text" role="alert">
            			You dont have matches yet
            		</div>
            	);
            }
        	else {
	           	const { general } = currentPlayerStatistic;

	           	if (general)
	            return (
					<div className="container">
				        <div className="row">
				        <div className="w-50">
							<Chart							
							  height={'400px'}
							  chartType="PieChart"
							  loader={<div>Loading Statistic</div>}
							  data={[
							    ['Status', 'Count'],
							    ['Win', general.winner],
							    ['Lose', general.lose]
							  ]}
							  options={{
							    title: 'General statistic',
							    sliceVisibilityThreshold: 0.2, // 20%,
							    legend: { position: 'bottom', alignment: 'start' },
							  }}
							  rootProps={{ 'data-testid': '7' }}
							/>
						</div>

				        <div className="w-50">
							<Chart
							  height={'400px'}
							  chartType="ColumnChart"
							  loader={<div>Loading Chart</div>}
							  data={
							  	this.getPlayerStatisticForChart(currentPlayerStatistic)
							  }
							  options={{
							    legend: { position: 'bottom', alignment: 'start' },
							    chart: {
							      title: 'Performance',
							      subtitle: 'with ohers players',
							    },
							    wAxis: {
							    	viewWindow: {max:  1},
							    },
							    hAxis: {
							    	slantedText:true,
							    	slantedTextAngle:45 
							    },
							  }}
							  // For tests
							  rootProps={{ 'data-testid': '2' }}
							/>
						</div>
						</div>
					</div>
					);
        	}
        };

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
                    <MatchItem key={tennisMatch.id} tennisMatch={tennisMatch} viewMode={true} />
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
                {this.state.displayMatches && filterMatches(currentPlayerMatches)}
                {!this.state.displayMatches && filterStatistic()}
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
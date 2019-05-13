import React, { Component } from 'react';
import { Chart } from "react-google-charts";

class Charts extends Component {

	constructor() {
		super();

		this.state = {
     		chartData:null
		}
	}

    getPlayerStatisticForChart = (currentPlayerStatistic) =>{
	    var currentPlayerStatisticKeys = Object.keys(currentPlayerStatistic);
		let output = [['Player', 'Win', 'Lose']];
		currentPlayerStatisticKeys.map((keys) => {
			if (keys !== "general")
				output.push([keys, currentPlayerStatistic[keys]["win"], currentPlayerStatistic[keys]["lose"]]);
			return "";
		});
		return(output);
	}


	render(){
        const filterStatistic = () => {
        	
			const {currentPlayerStatistic} = this.props;

    		if (currentPlayerStatistic) {
	           	const { general } = currentPlayerStatistic;
	           	if (general)
	            return (
					<div className="container">
				        <div className="row">
				        <div className="w-50">
				        <Charts />
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

		return (
			<React.Fragment>
				{
					filterStatistic()
				}
			</React.Fragment>
		);
	}
}

export default Charts;
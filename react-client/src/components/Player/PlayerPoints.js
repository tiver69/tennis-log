import React, { Component } from 'react';

class PlayerPoints extends Component {
	render(){

		const { points } = this.props;
		// const { player } = points[0]["player"];

		// for (var k in points[0])
		// 	console.log(k + " " + points[0][k]);

		var player = {};
		let count = 0;
		if (points[0]) {
			player = points[0].player;
			count = points[0].count;
		}

		function calculate_age(dob) { 
            var diff_ms = Date.now() - dob.getTime();
               var age_dt = new Date(diff_ms); 
      
               return Math.abs(age_dt.getUTCFullYear() - 1970);
        }

		return (
			<React.Fragment>
			<hr />
			<div className="text-center d-flex justify-content-center bd-highlight mb-3">
            <div className="card mb-1 bg-light border border-warning w-50">
                <div className="text-center card-title card-header text-warning d-flex justify-content-between">
                	<h5>1</h5>
                	<div>
                    {player.lastName} {player.firstName} - {player.birthday}{" "} 
                    ({calculate_age(new Date(player.birthday))} years) 
                    </div>
                    <p></p>
                </div>
                <div className="card-body bg-light text-center">
                	<div className="row d-flex justify-content-between">
                		<h1 className="text-center w-50">{count}</h1>
	                    <div className="text-center w-50">
		                    <h5 className="card-title">{player.leadingHand}-handed</h5>
		                    <p className="card-text text-truncate">
		                        In tennis for {calculate_age(new Date(player.experience,1,1))} years
		                    </p>
	                    </div>
                	</div>
                </div>
            </div>
            </div>
            <div className="row">
			{
			points.filter((tennisMatch, poss) => poss !== 0).map((point, poss) => {
						var player = {};
						let count = 0;
						if (points[0]) {
							player = point.player;
							count = point.count;
						}
						return (
						<div className="col-md-6" key={poss}>
			            <div className="card mb-1 bg-light">
			                <div className="text-center card-title card-header text-primary d-flex justify-content-between">
			                	<h5>{poss+2}</h5>
			                	<div>
			                    {player.lastName} {player.firstName} - {player.birthday}{" "} 
			                    ({calculate_age(new Date(player.birthday))} years) 
			                    </div>
			                    <p></p>
			                </div>
			                <div className="card-body bg-light text-center">
			                	<div className="row d-flex justify-content-between">
			                	<h1 className="text-center w-50">{count}</h1>
				                    <div className="text-center w-50">
				                    <h5 className="card-title">{player.leadingHand}-handed</h5>
				                    <p className="card-text text-truncate">
				                        In tennis for {calculate_age(new Date(player.experience,1,1))} years
				                    </p>
				                    </div>
			                	</div>
			                </div>
			            </div>
			            </div>
						);
					})

			}
			</div>
			</React.Fragment>
		);
	}
}

export default PlayerPoints;
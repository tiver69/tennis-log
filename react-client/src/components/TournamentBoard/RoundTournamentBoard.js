import React, { Component } from 'react';
import classnames from 'classnames';

class RoundTournamentBoard extends Component {

	render(){
		const { roundResult } = this.props;
		const { players } = this.props;

	    const getPlayerName = (i) =>{
	    	let name = "";
	    	if (players)
	    		players.filter((player, poss) => poss === i).map((player) => (
	    			name = player.lastName + " " + player.firstName
	    		));
			return(name);
		};

		const getPlayerId = (i) =>{
	    	let id = 0;
	    	if (players)
	    		players.filter((player, poss) => poss === i).map((player) => (
	    			id = player.id
	    		));
			return(id);
		};

		const isWinner = (playerTable, playerMatch) => {
			// console.log(playerTable.id+" "+getPlayerId(playerMatch));
			return (playerTable.id === getPlayerId(playerMatch));
		};

		const swapScore = (score) => {
			if (score === "0:0") return score;
			let swapped = "";
			var res = score.split(/:| /);
			for (var i = 0; i < 5; i++) {
				if (res[i*2])
				swapped = swapped + res[i*2+1] + ":" + res[i*2]+ " ";
			}
			// console.log(swapped);
			return swapped;
		};

		return (
			<div className="table-responsive card text-center">
			<table className="table table-striped table-active">
			<thead className="thead-dark">
			<tr>
			<th></th>
			{
				players.map((player, poss) => {
	    			return (
 						<th scope="col" key={poss}>
 						{player.lastName + " " + player.firstName}
 						</th>
	    			);
	    		})
			}
			</tr>
			</thead>
			<tbody >
			{
			roundResult.map((playerResult, i) => {
			return (
				<tr key={i*10}>
					<th className="table-dark" scope="row">{getPlayerName(i)}</th>
					{
					playerResult.map((match, j) =>{
						// console.log(i+"-"+j+" "+match);
						return(
								<td key={i*10+j} className={classnames("align-middle",{"table-dark":i===j},
																{"text-success":match && match["score"]!=="0:0" && isWinner(match["playerOne"],i)},
																{"text-danger":match && match["score"]!=="0:0" && !isWinner(match["playerOne"],i)})}>
								{
									i===j ? "" :
										match ? 
											isWinner(match["playerOne"],i) ? match["score"]
											: swapScore(match["score"]) 
										: " - : - "
								}
								</td>
							);
						})
					}
				</tr>
				
				);
			})
			}
			</tbody>
			</table>
			</div>
		);
	}
}

export default RoundTournamentBoard;
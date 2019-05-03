import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TournamentBoard extends Component {
	render(){

		const {tournamentId} = this.props.match.params;

		return (
		<div className="container">
		        <Link to={`/addMatch/${tournamentId}`} className="btn btn-primary mb-3">
		            <i className="fas fa-plus-circle"> Create Match </i>
		        </Link>
		        <br />
		        <hr />
		        { 
		        	//<!-- Backlog STARTS HERE -->
		        }
		        <div className="container">
		            <div className="row">
		                <div className="col-md-6">
		                    <div className="card text-center mb-2">
		                        <div className="card-header bg-secondary text-white">
		                            <h3>SHEDULED</h3>
		                        </div>
		                    </div>

		                   {
		                   	// <!-- SAMPLE PROJECT TASK STARTS HERE -->
		                   }
		                    <div className="card mb-1 bg-light">

		                        <div className="text-center card-header text-primary">
		                             Player One -- Player Two
		                        </div>
		                        <div className="card-body bg-light text-center">
		                            <h5 className="card-title">match.score</h5>
		                            <p className="card-text text-truncate text-right">
		                                match.data
		                            </p>
		                            <a href="#" className="btn btn-primary">
		                                View / Update
		                            </a>

		                            <button className="btn btn-danger ml-4">
		                                Delete
		                            </button>
		                        </div>
		                    </div>

		                   {
		                   	// <!-- SAMPLE PROJECT TASK ENDS HERE -->
		                   }
		                {
		                // </div>
		                // <div className="col-md-5">
		                //     <div className="card text-center mb-2">
		                //         <div className="card-header bg-primary text-white">
		                //             <h3>FINNISHED</h3>
		                //         </div>
		                //     </div>
		            }
		                    {
		                   // <!-- SAMPLE PROJECT TASK STARTS HERE -->

		                  //  <!-- SAMPLE PROJECT TASK ENDS HERE -->
		                }
		                </div>
		                <div className="col-md-6">
		                    <div className="card text-center mb-2">
		                        <div className="card-header bg-success text-white">
		                            <h3>FINNISHED</h3>
		                        </div>
		                    </div>
		                    {
		                   // <!-- SAMPLE PROJECT TASK STARTS HERE -->

		                   // <!-- SAMPLE PROJECT TASK ENDS HERE -->
		                	}
		                </div>
		            </div>
		        </div>
		    </div>
		);
	}
}

export default TournamentBoard;
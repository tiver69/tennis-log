import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddMatch extends Component {
	render(){

		const {tournamentId} = this.props.match.params;

		return (
	    <div className="add-PBI">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8 m-auto">
	                    <Link to={`/tournamentBoard/${tournamentId}`} className="btn btn-light">
	                        Back to Tournament Board
	                    </Link>
	                    <h4 className="display-4 text-center"> Add Match</h4>
	                    <p className="lead text-center">for {tournamentId}</p>
	                    <form onSubmit={this.onSubmit}>

	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="playerOneId">
	                                <option value="">Select PlayerOne</option>
	                                <option value="true">player1</option>
	                                <option value="false">Player2</option>
	                            </select>
	                        </div>

	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="playerTwoId">
	                                <option value="">Select PlayerTwo</option>
	                                <option value="true">player1</option>
	                                <option value="false">Player2</option>
	                            </select>
	                        </div>

	                        <div className="form-group">
	                            <input type="text" className="form-control form-control-lg" name="summary" placeholder="score" />
	                        </div>
	                        <h6> Date</h6>
	                        <div className="form-group">
	                            <input type="date" className="form-control form-control-lg" name="date" />
	                        </div>
	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="priority">
	                                <option value="">Select Winner</option>
	                                <option value="true">Player One</option>
	                                <option value="false">Player Two</option>
	                            </select>
	                        </div>

	                        <div className="form-group">
	                            <select className="form-control form-control-lg" name="status">
	                                <option value="">Select Status</option>
	                                <option value="true">SHEADULED</option>
	                                <option value="false">FINNISHED</option>
	                            </select>
	                        </div>

	                        <input type="submit" className="btn btn-primary btn-block mt-4" />
	                    </form>
	                </div>
	            </div>
	        </div>
	    </div>
		);
	}
}

export default AddMatch;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTournament } from '../../actions/tournamentActions';


class TournamentItem extends Component {

	onDeleteClick = tournamentId =>{
		this.props.deleteTournament(tournamentId);
	}

	render(){

		const {tournament} = this.props;
		const { roles } = this.props;
		const buttons = (roles) => {
			if (roles.includes("ADMIN")) 
			return(
			<React.Fragment>
	        	<Link to={`/updateTournament/${tournament.id}`}>
	        	    <li className="list-group-item update">
	        	        <i className="fa fa-edit pr-1"> Update Tournament Info</i>
	        	    </li>
	        	</Link>
	        	<li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, tournament.id)}>
	        	    <i className="fa fa-minus-circle pr-1"> Delete Tournament</i>
	        	</li>
            </React.Fragment>
            );
		};

		return (
		<div className="container">
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <span className="mx-auto">from {tournament.startDate} <hr /> to {tournament.endDate}</span>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{tournament.name}</h3>
                        <p>{tournament.information}</p>
                    </div>
					<div className="col-md-4 d-none d-lg-block">
		            	<ul className="list-group">
			        	    <Link to={`/tournamentBoard/${tournament.id}`}>
				    	        <li className="list-group-item board">
				    	         <i className="fa fa-flag-checkered pr-1"> Matches </i>
				    	        </li>
			        	    </Link>
			        	    {buttons(roles)}
		            	</ul>
		            </div>

                </div>
            </div>
        </div>
		);
	}
}

TournamentItem.propTypes={
	deleteTournament: PropTypes.func.isRequired
};

export default connect (null, { deleteTournament }) (TournamentItem);

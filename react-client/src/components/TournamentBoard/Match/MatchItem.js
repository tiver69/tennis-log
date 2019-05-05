import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteMatch } from '../../../actions/matchActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MatchItem extends Component {

    onDeleteClick = matchId =>{
        this.props.deleteMatch(matchId);
    }

	render(){

        const {tennisMatch} = this.props;
        const {tournamentId} =this.props;

		return (
            <div className="card mb-1 bg-light">
                <div className="text-center card-header text-primary">
                     {tennisMatch.playerOne.lastName} {tennisMatch.playerOne.firstName} --  {tennisMatch.playerTwo.lastName} {tennisMatch.playerTwo.firstName}
                </div>
                <div className="card-body bg-light text-center">
                    <h5 className="card-title">{tennisMatch.score}</h5>
                    <p className="card-text text-truncate text-right">
                        {tennisMatch.date}
                        {((tennisMatch.playedStatus).toString()==="false").toString()}
                    </p>
                    <Link to={`/updateMatch/t-${tournamentId}/m-${tennisMatch.id}`} className="btn btn-primary">
                        View / Update
                    </Link>
                    <button className="btn btn-danger ml-4" onClick={this.onDeleteClick.bind(this, tennisMatch.id)}>
                        Delete
                    </button>
                </div>
            </div>
		);
	}
}

MatchItem.propTypes = {
    deleteMatch: PropTypes.func.isRequired,
}

export default connect (null, { deleteMatch })(MatchItem);
		                   
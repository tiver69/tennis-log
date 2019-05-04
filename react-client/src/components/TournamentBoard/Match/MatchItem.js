import React, { Component } from 'react';

class MatchItem extends Component {
	render(){

        const {tennisMatch} = this.props;

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
                    <a href="#" className="btn btn-primary">
                        View / Update
                    </a>
                    <button className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>
		);
	}
}

export default MatchItem;










		                   
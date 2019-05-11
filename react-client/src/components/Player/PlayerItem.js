import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayerItem extends Component {

    onDeleteClick = matchId =>{
        this.props.deleteMatch(matchId);
    }

	render(){

        const {player} = this.props;

        function calculate_age(dob) { 
            var diff_ms = Date.now() - dob.getTime();
               var age_dt = new Date(diff_ms); 
      
               return Math.abs(age_dt.getUTCFullYear() - 1970);
        }

		return (
            <div className="col-md-6" >
            <div className="card mb-1 bg-light">
                <div className="text-center card-header text-primary">
                    {player.firstName} {player.lastName} - {player.birthday}{" "} 
                    ({calculate_age(new Date(player.birthday))} years) 
                </div>
                <div className="card-body bg-light text-center">
                    <h5 className="card-title">{player.leadingHand}-handed</h5>
                    <p className="card-text text-truncate text-right">
                        In tennis for {calculate_age(new Date(player.experience,1,1))} years
                    </p>
                    <Link to={`/updatePlayer/${player.id}`} className="btn btn-primary ml-4">
                        Update Info
                    </Link>
                </div>
            </div>
            </div>
		);
	}
}

export default PlayerItem;
		                   
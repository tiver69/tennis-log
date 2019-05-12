import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setAdmin, removeAdmin } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PlayerItem extends Component {

    onSetAdminClick = playerId =>{
        // console.log(playerId);
        this.props.setAdmin(playerId);
    }

    onRemoveAdminClick = playerId =>{
        // console.log(playerId);
        this.props.removeAdmin(playerId);
    }

	render(){

        const {player} = this.props;

        function calculate_age(dob) { 
            var diff_ms = Date.now() - dob.getTime();
               var age_dt = new Date(diff_ms); 
      
               return Math.abs(age_dt.getUTCFullYear() - 1970);
        }

        const adminButton = (isAdmin) => {
            if (isAdmin)
                return(
                    <li onClick={this.onRemoveAdminClick.bind(this, player.id)} className="btn btn-danger ml-4">
                        Remove Admin
                    </li>
                );
            else
                return(
                    <li onClick={this.onSetAdminClick.bind(this, player.id)} className="btn btn-success ml-4">
                        Set Admin
                    </li>
                );
        };


		return (
            <div className="col-md-6" >
            <div className="card mb-1 bg-light">
                <div className="text-center card-header text-primary">
                    {player.lastName} {player.firstName} - {player.birthday}{" "} 
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
                    {Number(this.props.security.player.id) !== Number(player.id) 
                        && adminButton(player.roles && player.roles.includes("ADMIN"))}
                </div>
            </div>
            </div>
		);
	}
}

const mapStateToProps = state => ({
    security: state.security,

});


PlayerItem.propTypes = {
    setAdmin: PropTypes.func.isRequired,
    removeAdmin: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
}

export default connect (mapStateToProps, { setAdmin, removeAdmin })(PlayerItem);
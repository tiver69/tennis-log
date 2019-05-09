import React, { Component } from 'react';
import { getUnregistered } from '../../actions/securityActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UnregisteredPlayers extends Component {

	componentDidMount (){
		this.props.getUnregistered();
    };

	render(){

		const { unregistered } = this.props.security;


		let rowOne = []
        let rowTwo = []

        const unregisteredPlayers = unregistered.map(player => (
        	<Link key={player.id} to={`/register/${player.id}`}>
			<div className="card mb-1 bg-light" >
                <div className="text-center card-header text-primary">
                	{player.firstName} {player.lastName} - {player.age}
                </div>
                <div className="card-body bg-light text-center">
                    <h5 className="card-title">{player.leadingHand}</h5>
                    <p className="card-text text-truncate text-right">
                        {player.experience}
                    </p>
                </div>
            </div>
            </Link>
        ));

        for(let i=0; i<unregisteredPlayers.length; i++){
            if (i%2===0){
                rowOne.push(unregisteredPlayers[i])
            }
            if (i%2!==0){
                rowTwo.push(unregisteredPlayers[i])
            }
        }

		return (
		<div className="container">
	    	<div className="row">
	        	<div className="col-md-6">
				{rowOne}
				</div>
				<div className="col-md-6">
				{rowTwo}
				</div>
			</div>
		</div>
		);
	}
}

const mapStateToProps = state => ({
    security: state.security,

});

UnregisteredPlayers.propTypes = {
	getUnregistered: PropTypes.func.isRequired,	
	security: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getUnregistered})(UnregisteredPlayers);
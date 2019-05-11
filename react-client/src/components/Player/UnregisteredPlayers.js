import React, { Component } from 'react';
import { getUnregistered } from '../../actions/playerActions';
import PlayerItem from './PlayerItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UnregisteredPlayers extends Component {

	componentDidMount (){
        if (this.props.security.isTokenValid) {
            this.props.history.push("/dashboard");
        }
		this.props.getUnregistered();
    };

	render(){

		const { unregistered } = this.props.player;

        const unregisteredPlayers = unregistered.map(player => (
            <div key={player.id} className="col-md-6">
        	<Link to={`/register/${player.id}`}>
			    <PlayerItem player={player} view={false}/>
            </Link>
            </div>
        ));

		return (
		<div className="container">
	    	<div className="row">
				{unregisteredPlayers}
			</div>
		</div>
		);
	}
}

const mapStateToProps = state => ({
    player: state.player,
    security: state.security
});

UnregisteredPlayers.propTypes = {
	getUnregistered: PropTypes.func.isRequired,	
	player: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getUnregistered})(UnregisteredPlayers);
import React, { Component } from 'react';
import { getPlayers } from '../../actions/playerActions';
import PlayerItem from './PlayerItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PlayerBoard extends Component {

    componentDidMount (){
        this.props.getPlayers();
    }

	render(){

		const { players } = this.props.player;

		const PlayersItems = players.map(player => (
            	<div className="col-md-6" key={player.id}>
                    <PlayerItem player={player} view={true}/>
                </div>
        ));

		return (
			<div className="container">
				<div className="row">
					{PlayersItems}
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
    player:state.player,
});

PlayerBoard.propTypes = {
	getPlayers: PropTypes.func.isRequired,	
};

export default connect (mapStateToProps, { getPlayers }) (PlayerBoard);
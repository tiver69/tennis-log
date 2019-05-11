import React, { Component } from 'react';
import { getPlayers } from '../../actions/playerActions';
import PlayerItem from './PlayerItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class PlayerBoard extends Component {

    componentDidMount (){
        this.props.getPlayers();
    }

	render(){

		const { players } = this.props.player;

		const PlayersItems = players.map(player => (
            <PlayerItem player={player} key={player.id} view={true}/>
        ));

        const CreatePlayerButton = () => {
			return (
				<React.Fragment>
                	<Link to={`/register`} className="btn btn-primary mb-3">
			     		<i className="fas fa-plus-circle"> Create Player </i>
					</Link>
					<br />
	            </React.Fragment>
			);
		}

		return (
			<div className="container">
				{CreatePlayerButton()}
				<hr />
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
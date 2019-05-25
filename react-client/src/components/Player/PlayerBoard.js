import React, { Component } from 'react';
import { getPlayers, getPoints } from '../../actions/playerActions';
import PlayerItem from './PlayerItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import PlayerPoints from './PlayerPoints';

class PlayerBoard extends Component {

	constructor() {
		super();

		this.state = {
			displaySettings: true
		}
	}

    componentDidMount (){
    	if (this.props.security.isTokenValid 
    		&& this.props.security.player.roles.includes("ADMIN"))
        		this.props.getPlayers();        
        this.props.getPoints();
    }

    onDisplaySettingsClick = (e) =>{
		this.setState({
			displaySettings:false
		});
    }

    onDisplayStatisticClick = (e) =>{
		this.setState({
			displaySettings:true
		});
    }

	render(){

		const { players } = this.props.player;
		const { points } = this.props.player;

		const PlayersItems = players.map(player => (
            <PlayerItem player={player} key={player.id} view={true}/>
        ));

        const CreatePlayerButton = () => {
			return (
				<React.Fragment>
                	<Link to={`/register`} className="btn btn-primary">
			     		<i className="fas fa-plus-circle"> Create Player </i>
					</Link>
	            </React.Fragment>
			);
		}

		const AdminButtons = () => {
			return (
				<div className="form-group container">
			        <div className="row d-flex justify-content-between">
			        	{CreatePlayerButton()}
			        	<div className="w-75">
		                <button className={classnames("bt btn w-50",{"btn-primary":!this.state.displaySettings},{"border-primary":this.state.displaySettings})}
		                	onClick={this.onDisplaySettingsClick.bind(this)}>
		                    Settings
		                </button>
		                <button className={classnames("bt btn w-50",{"btn-primary":this.state.displaySettings},{"border-primary":!this.state.displaySettings})}
		                	onClick={this.onDisplayStatisticClick.bind(this)}>
		                    Statistic
		                </button>
		                </div>
			        </div>
			    </div>
			);
		}

		const PlayerSettings = () => {
			return (
				<React.Fragment>
					<hr />
					<div className="row">
						{PlayersItems}
					</div>
				</React.Fragment>
			);
		}

		return (
			<div className="container">
				{
					this.props.security.player.roles.includes("ADMIN") &&
					AdminButtons()
				}
				{
					this.state.displaySettings &&
					<PlayerPoints points={points} />
				}
				{
					!this.state.displaySettings &&
					PlayerSettings()
				}

			</div>
		);
	}
}


const mapStateToProps = state => ({
    player:state.player,
    security: state.security,
});

PlayerBoard.propTypes = {
	getPlayers: PropTypes.func.isRequired,
	getPoints: PropTypes.func.isRequired,
};

export default connect (mapStateToProps, { getPlayers, getPoints }) (PlayerBoard);
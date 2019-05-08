import React, { Component } from 'react';
import { getCurrentPlayer } from '../../actions/playerActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class PlayerPage extends Component {

	componentDidMount (){
		this.props.getCurrentPlayer();
    };

	render(){

		const { currentPlayer } = this.props.currentPlayer;

		return (
			<div className="card mb-1 bg-light">
                <div className="text-center card-header text-primary">
                	{currentPlayer.firstName} {currentPlayer.lastName} - {currentPlayer.age}
                </div>
                <div className="card-body bg-light text-center">
                    <h5 className="card-title">{currentPlayer.leadingHand}</h5>
                    <p className="card-text text-truncate text-right">
                        {currentPlayer.experience}
                    </p>
                    <Link to={`/`} className="btn btn-primary">
                        View / Update
                    </Link>
                    <button className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>
		);
	}
}

const mapStateToProps = state => ({
    errors: state.errors,
    currentPlayer: state.player,

});

PlayerPage.propTypes = {
	getCurrentPlayer: PropTypes.func.isRequired,	
	errors: PropTypes.object.isRequired,
	currentPlayer: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getCurrentPlayer} )(PlayerPage);
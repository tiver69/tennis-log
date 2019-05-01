import React from 'react';
import { Link } from 'react-router-dom';

const CreateTournamentButton = () => {
		return (
			<React.Fragment>
            <Link to="/addTournament" className="btn btn-lg btn-info">
                Create a Tournament
            </Link>
            </React.Fragment>
		);
}

export default CreateTournamentButton;

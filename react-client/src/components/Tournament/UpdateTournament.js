import React, { Component } from 'react';
import { getTournament, createTournament } from '../../actions/tournamentActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class UpdateTournament extends Component {

	constructor(){
		super()

		this.state = {
			id: "",
			name: "",
			information: "",
			startDate: "",
			endDate: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}

		const {
			id,
			name,
			information,
			startDate,
			endDate,
		} = nextProps.tournament;

		this.setState({
			id,
			name,
			information,
			startDate,
			endDate,
		})
	}

	componentDidMount() {
		const{ tournamentId } = this.props.match.params;
		this.props.getTournament(tournamentId, this.props.history);
	}

	onChange(e){
		this.setState({[e.target.name]:e.target.value})
	}

	onSubmit(e){
		e.preventDefault()

		const updateTournament = {
			id: this.state.id,
			name: this.state.name,
			information: this.state.information,
			startDate: this.state.startDate,
			endDate: this.state.endDate
		};

		this.props.createTournament(updateTournament, this.props.history);
	}


	render(){

		const {errors} = this.state;

		return (
		<div className="register">
		        <div className="container">
		            <div className="row">
		                <div className="col-md-8 m-auto">
		                    <h5 className="display-4 text-center">Edit Tournament form</h5>
		                    <hr />
		                    <form onSubmit={this.onSubmit}>
		                        <div className="form-group">
		                            <input type="text" className={classnames("form-control form-control-lg", {"is-invalid":errors.name})} placeholder="Tournament Name" name="name" value={this.state.name} onChange={this.onChange}/>
		                            {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
		                        </div>
		                        <div className="form-group">
		                            <textarea className="form-control form-control-lg" placeholder="Tournament Information" name="information" value={this.state.information || ''} onChange={this.onChange}></textarea>
		                        </div>
		                        <h6>Start Date</h6>
		                        <div className="form-group">
		                            <input type="date" className="form-control form-control-lg" name="startDate" value={this.state.startDate || ''} onChange={this.onChange}/>
		                        </div>
		                        <h6>Estimated End Date</h6>
		                        <div className="form-group">
		                            <input type="date" className="form-control form-control-lg" name="endDate" value={this.state.endDate || ''} onChange={this.onChange}/>
		                        </div>

		                        <input type="submit" className="btn btn-primary btn-block mt-4" />
		                    </form>
		                </div>
		            </div>
		        </div>
		    </div>
		);
	}
}

const mapStateToProps = state => ({
	tournament: state.tournament.tournament,
	errors: state.errors
});

UpdateTournament.propTypes = {
	getTournament: PropTypes.func.isRequired,
	createTournament: PropTypes.func.isRequired,
	tournament: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getTournament, createTournament }) (UpdateTournament);
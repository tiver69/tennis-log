import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTournament } from '../../actions/tournamentActions';

class AddTournament extends Component {

	constructor(){
		super()

		this.state={
			name: "",
			information: "",
			startDate: "",
			endDate: ""
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const newTournament ={
			name: this.state.name,
			information: this.state.information,
			startDate: this.state.startDate,
			endDate: this.state.endDate
		};
		this.props.createTournament(newTournament, this.props.history);
	}


	render(){
		return (
			<div className="tournament">
			        <div className="container">
			            <div className="row">
			                <div className="col-md-8 m-auto">
			                    <h5 className="display-4 text-center">Create Tournament</h5>
			                    <hr />
			                    <form onSubmit={this.onSubmit}>
			                        <div className="form-group">
			                            <input type="text" className="form-control form-control-lg " placeholder="Tournament Name" name="name" value={this.state.name} onChange={this.onChange}/>
			                        </div>
			                        <div className="form-group">
			                            <textarea className="form-control form-control-lg" placeholder="Tournament Information" name="information" value={this.state.information} onChange={this.onChange}></textarea>
			                        </div>
			                        <h6>Start Date</h6>
			                        <div className="form-group">
			                            <input type="date" className="form-control form-control-lg" name="startDate" value={this.state.startDate} onChange={this.onChange}/>
			                        </div>
			                        <h6>End Date</h6>
			                        <div className="form-group">
			                            <input type="date" className="form-control form-control-lg" name="endDate" value={this.state.endDate} onChange={this.onChange}/>
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

AddTournament.propTypes = {
	createTournament : PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//     errors: state.errors
// });

export default connect(null, {createTournament}) (AddTournament);
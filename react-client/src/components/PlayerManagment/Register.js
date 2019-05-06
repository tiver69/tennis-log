import React, { Component } from 'react';

class Register extends Component {
	render(){
		return (
		<div className="register">
		        <div className="container">
		            <div className="row">
		                <div className="col-md-8 m-auto">
		                    <h1 className="display-4 text-center">Sign Up</h1>
		                    <p className="lead text-center">Create your Account</p>
		                    <form action="create-profile.html">
		                        <div className="form-group">
		                            <input type="text" className="form-control form-control-lg" placeholder="First Name" name="firstName"
		                                required />
		                        </div>
		                        <div className="form-group">
		                            <input type="text" className="form-control form-control-lg" placeholder="Last Name" name="lastName"
		                                required />
		                        </div>
		                        <div className="form-group">
		                            <input type="number" className="form-control form-control-lg" placeholder="Age" name="age"
		                                required />
		                        </div>
		                        <div className="form-group">
		                            <select className="form-control form-control-lg" name="leadingHand">
		                                <option value="">Select Leading Hand</option>
		                                <option value="true">Left</option>
		                                <option value="false">Right</option>
		                            </select>
		                        </div>
		                        <div className="form-group">
		                            <input type="number" className="form-control form-control-lg" placeholder="Experience" name="experience"/>
		                        </div>
		                        <div className="form-group">
		                            <input type="email" className="form-control form-control-lg" placeholder="Username" name="username" />

		                        </div>
		                        <div className="form-group">
		                            <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" />
		                        </div>
		                        <div className="form-group">
		                            <input type="password" className="form-control form-control-lg" placeholder="Confirm Password"
		                                name="password2" />
		                        </div>
		                        <input type="submit" className="btn btn-info btn-block mt-4" />
		                    </form>
		                </div>
		            </div>
		        </div>
		    </div>
		);
	}
}

export default Register;
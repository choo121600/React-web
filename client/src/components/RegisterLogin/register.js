import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { registerUser } from "../../actions/user_action";

class Register extends Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  };

  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  isFormVaild = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill In All Fields" };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password Is Invalid" };
      this.setState({ error: errors.concat(error) });
    } else {
      return true;
    }
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ name, lastname, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !lastname.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    };
    console.log(dataToSubmit);

    if (this.isFormVaild(this.state)) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat("회원가입에 실패 하였습니다."),
            });
          }
        })
        .catch((err) => {
          errors: this.state.errors.concat(err);
        });
    } else {
      console.error("Form is not valid");
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Sign Up</h2>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                  id="name"
                  type="text"
                  class="validate"
                />
                <label class="active" for="name">
                  First Name
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type first name"
                  data-success="right"
                />
              </div>
              <div class="input-field col s6">
                <input
                  name="lastname"
                  value={this.state.lastname}
                  onChange={(e) => this.handleChange(e)}
                  id="lastname"
                  type="text"
                  class="validate"
                />
                <label class="active" for="lastname">
                  Last Name
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type last name"
                  data-success="right"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  id="email"
                  type="email"
                  class="validate"
                />
                <label class="active" for="email">
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type email"
                  data-success="right"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  id="password"
                  type="password"
                  class="validate"
                />
                <label class="active" for="password">
                  Password
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type password"
                  data-success="right"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  name="passwordConfirmation"
                  value={this.state.passwordConfirmation}
                  onChange={(e) => this.handleChange(e)}
                  id="passwordConfirmation"
                  type="password"
                  class="validate"
                />
                <label class="active" for="passwordConfirmation">
                  Password Confirmation
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type password"
                  data-success="right"
                />
              </div>
            </div>

            {this.state.errors.length > 0 && (
              <div>{this.displayErrors(this.state.errors)}</div>
            )}

            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  CREATE ACCOUNT
                </button>
                &nbsp;&nbsp;&nbsp;
                <Link to="/login">
                  <button
                    className="btn waves-effect red lighten-2"
                    type="submit"
                    name="action"
                  >
                    SIGN IN
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);

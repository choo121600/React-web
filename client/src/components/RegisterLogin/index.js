import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_action";
import { Link } from "react-router-dom";

class RegisterLogin extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
  };

  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.isFormvalid(this.state)) {
      this.setState({ errors: [] });
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        console.log(response);
        if (response.payload.loginSuccess) {
          this.props.history.push("/");
        } else {
          this.setState({
            errors: this.state.errors.concat(
              "로그인에 실패 하였습니다. 이메일 또는 비밀번호를 확인해주세요."
            ),
          });
        }
      });
    } else {
      this.setState({
        errors: this.state.errors.concat(
          "로그인에 실패 하였습니다. 이메일 또는 비밀번호를 모두 작성해주세요."
        ),
      });
    }
  };

  isFormvalid = ({ email, password }) => email && password;

  render() {
    return (
      <div className="container">
        <h2>Log In</h2>
        <div className="row">
          <form
            className="col s12"
            onSubmit={(event) => this.submitForm(EventSource)}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  id="email"
                  type="email"
                  className="validate"
                />
                <label class="active" htmlFor="email">
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type email"
                  data-success="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label class="active" htmlFor="password">
                  Password
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
                  Sign In
                </button>
                &nbsp;&nbsp;&nbsp;
                <Link to="/register">
                  <button
                    className="btn waves-effect red lighten-2"
                    type="submit"
                    name="action"
                  >
                    Sign Up
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

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(RegisterLogin);

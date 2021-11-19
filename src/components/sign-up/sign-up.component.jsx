import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth } from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import createUser from "../../firebase/create-user";
import { connect } from "react-redux";
import { signUpRequest } from "../../redux/user/user.action";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    const { signUpRequest } = this.props;
    signUpRequest({ displayName, email, password });
    if (password !== confirmPassword) {
      alert("Password don't match.");
      return;
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            label="Display Name"
            required
            handleChange={this.handleChange}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            label="E-mail"
            required
            handleChange={this.handleChange}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            label="Password"
            required
            handleChange={this.handleChange}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            label="confirmPassword"
            required
            handleChange={this.handleChange}
          />

          <div className="buttons">
            <CustomButton type="submit">Signup</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpRequest: (userCredentials) => dispatch(signUpRequest(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);

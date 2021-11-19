import React from "react";
import { connect } from "react-redux";
import {
  emailSignInRequest,
  googleSignInRequest,
} from "../../redux/user/user.action";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { emailSignInRequest } = this.props;
    emailSignInRequest(email, password);
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    const { googleSignInRequest } = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
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

          <div className="buttons">
            <CustomButton type="submit">Signin</CustomButton>
            <CustomButton
              type="button"
              isGoogleSignIn
              onClick={googleSignInRequest}
            >
              Google Signin
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInRequest: () => dispatch(googleSignInRequest()),
  emailSignInRequest: (email, password) =>
    dispatch(emailSignInRequest({ email, password })),
});
export default connect(null, mapDispatchToProps)(SignIn);

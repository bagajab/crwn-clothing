import React, { useState } from "react";
import { connect } from "react-redux";
import {
  emailSignInRequest,
  googleSignInRequest,
} from "../../redux/user/user.action";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in.styles.scss";

const SignIn = ({ emailSignInRequest, googleSignInRequest }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();
    emailSignInRequest(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          label="E-mail"
          required
          handleChange={handleChange}
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          label="Password"
          required
          handleChange={handleChange}
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
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInRequest: () => dispatch(googleSignInRequest()),
  emailSignInRequest: (email, password) =>
    dispatch(emailSignInRequest({ email, password })),
});
export default connect(null, mapDispatchToProps)(SignIn);

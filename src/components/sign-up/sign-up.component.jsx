import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { signUpRequest } from "../../redux/user/user.action";

const SignUp = ({ signUpRequest }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don't match.");
      return;
    }
    signUpRequest({ displayName, email, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          label="Display Name"
          required
          handleChange={handleChange}
        />

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

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          label="confirmPassword"
          required
          handleChange={handleChange}
        />

        <div className="buttons">
          <CustomButton type="submit">Signup</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpRequest: (userCredentials) => dispatch(signUpRequest(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);

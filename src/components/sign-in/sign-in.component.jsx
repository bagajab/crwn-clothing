import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/firebase.utils";
import { signInWithGoogle } from "../../firebase/sign-in-with-google";
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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
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
            <CustomButton isGoogleSignIn onClick={() => signInWithGoogle()}>
              Google Signin
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;

import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component";
import "./App.css";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";
import React from "react";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <Header currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignInAndSignUp />} />
        </Routes>
      </div>
    );
  }
}

export default App;

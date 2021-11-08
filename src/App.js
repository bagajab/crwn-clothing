import { onSnapshot } from "firebase/firestore";
import React from "react";
import { connect, disp } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";
import SignInAndSignUp from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";

import createUser from "./firebase/create-user";
import { auth } from "./firebase/firebase.utils";

import Homepage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component";
import setCurrentUser from "./redux/user/user.action";

class App extends React.Component {
  unsubscribeFromAuth = null;
  userSnapShot = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUser(userAuth);
        console.log(userAuth);
        this.userSnapShot = onSnapshot(userRef, (doc) => {
          setCurrentUser({ id: doc.id, ...doc.data() });
        });
      } else setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.userSnapShot();
  }
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignInAndSignUp />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);

import { onSnapshot } from "firebase/firestore";
import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";
import SignInAndSignUp from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";
import PrivateRoute from "./components/private-route/private-route.component";

import createUser from "./firebase/create-user";
import { auth } from "./firebase/firebase.utils";

import Homepage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component";
import setCurrentUser from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import Checkout from "./pages/checkout/checkout.component";
import { selectCollectionForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;
  userSnapShot = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUser(userAuth);
        this.userSnapShot = onSnapshot(userRef, (doc) => {
          setCurrentUser({ id: doc.id, ...doc.data() });
        });
      } else setCurrentUser(userAuth);
    });

    // UNCOMMENT BELOW LINE IF FIRESTORE SHOPS IS EMEPTY
    // addCollectionAndDocuments(
    //   "collections",
    //   collectionArray.map(({ title, items }) => ({ title, items }))
    // );
  }

  componentWillUnmount() {
    try {
      this.unsubscribeFromAuth();
      this.userSnapShot();
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/signin"
            element={
              <PrivateRoute>
                <SignInAndSignUp />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

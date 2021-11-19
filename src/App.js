import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";
import SignInAndSignUp from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";
import PrivateRoute from "./components/private-route/private-route.component";

import Homepage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import Checkout from "./pages/checkout/checkout.component";
import { selectCollectionForPreview } from "./redux/shop/shop.selectors";
import { checkUserSession } from "./redux/user/user.action";

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

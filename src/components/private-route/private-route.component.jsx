import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { currentUser, children } = props;
  return currentUser ? <Navigate to="/" /> : children;
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(PrivateRoute);

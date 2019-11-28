import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PublicRoute({ component: Component, user }) {
  return !user ? <Component /> : <Redirect to="/home" />;
}

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(PublicRoute);

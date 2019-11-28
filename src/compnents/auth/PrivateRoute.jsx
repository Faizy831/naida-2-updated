import React from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

function PrivateRoute({ user, component: Component }) {
  return user ? <Component /> : <Redirect to="/signin" />;
}
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(PrivateRoute);

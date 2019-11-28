import React from "react";
import { connect } from "react-redux";

// router
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import { auth } from "./config/firebase";
// redux

// style

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import "react-big-calendar/lib/css/react-big-calendar.css"; // theme css file

import "./App.css";

// components
import { Container } from "reactstrap";
// public
import SignIn from "./compnents/auth/SignIn";
import SignUp from "./compnents/auth/SignUp";
import Recover from "./compnents/auth/Recover";
// private
import Header from "./compnents/layout/Header";
import SideMenu from "./compnents/layout/SideMenu";

// import UnderDev from "./compnents/layout/UnderDev";
import Clients from "./compnents/clients";
import Payments from "./compnents/payments/";
import Projects from "./compnents/projects";
import Expenses from "./compnents/expenses";
import Suppliers from "./compnents/suppliers";
import Settings from "./compnents/settings";
import PrivateRoute from "./compnents/auth/PrivateRoute";
import PublicRoute from "./compnents/auth/PublicRoute";
import Home from "./compnents/home/Home";
import Reports from "./compnents/reports/";
import WorkLoad from "./compnents/workload/workload2";

import { verifyUser } from "./actions/authActions";

function App({ verifyUser }) {
  auth.onAuthStateChanged(user => {
    verifyUser(user);
  });
  return (
    <Router history={history}>
      <Switch>
        {/* public routes */}
        <Route
          path="/signin"
          exact
          render={() => <PublicRoute component={SignIn} />}
        />
        <Route
          path="/SignUp"
          exact
          render={() => <PublicRoute component={SignUp} />}
        />
        <Route
          path="/Recover"
          exact
          render={() => <PublicRoute component={Recover} />}
        />
        {/* private routes */}
        <Route render={() => <PrivateRoute component={Panel} />} />
      </Switch>
    </Router>
  );
}

function Panel() {
  return (
    <Container fluid className="p-0 m-0 d-flex">
      <SideMenu />
      <div className="flex-fill">
        <Header />
        <div className="content_container">
          <Switch>
            {/* private routes */}
            <Route path="/clients" component={Clients} />
            <Route path="/projects" component={Projects} />
            <Route path="/payments" component={Payments} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/settings" component={Settings} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/reports" component={Reports} />
            <Route path="/home" component={Home} />
            <Route path="/workload" component={WorkLoad} />
          </Switch>
        </div>
      </div>
    </Container>
  );
}

export default connect(
  null,
  { verifyUser }
)(App);

import React from "react";
import { Switch, Route } from "react-router-dom";
import NewPayment from "./NewPayment";
import Payments from "./Payments";

function Index() {
  return (
    <Switch>
      <Route exact path="/payments/new" component={NewPayment} />
      <Route exact path="/payments" component={Payments} />
    </Switch>
  );
}

export default Index;

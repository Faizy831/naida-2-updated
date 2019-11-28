import React from "react";
import { Switch, Route } from "react-router-dom";
import ClientsList from "./ClientsList";
import NewClient from "./NewClient";
import ClientDetails from "./ClientDetails";

function Index() {
  return (
    <Switch>
      <Route exact path="/clients/new" component={NewClient} />
      <Route exact path="/clients/:id" component={ClientDetails} />
      <Route exact path="/clients" component={ClientsList} />
    </Switch>
  );
}

export default Index;

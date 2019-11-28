import React from "react";
import { Switch, Route } from "react-router-dom";
import Reports from "./Reports";
import Projects from "./Projects";
import Clients from "./Clients";
import Expenses from "./Expenses";
import Utilization from "./Utilization";

function Index() {
  return (
    <Switch>
      <Route exact path="/reports/" component={Reports} />
      <Route exact path="/reports/projects" component={Projects} />
      <Route exact path="/reports/clients" component={Clients} />
      <Route exact path="/reports/expenses" component={Expenses} />
      <Route exact path="/reports/utilization" component={Utilization} />
    </Switch>
  );
}

export default Index;

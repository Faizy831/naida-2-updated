import React from "react";
import { Switch, Route } from "react-router-dom";
import Settings from "./Settings";
import Team from "./Team";
import AddTeam from "./AddTeam";
import Presets from "./Presets";
import Alerts from "./Alerts";
import EditTeam from "./EditTeam";

function Index() {
  return (
    <Switch>
      <Route exact path="/settings/team" component={Team} />
      <Route exact path="/settings/team/new" component={AddTeam} />
      <Route exact path="/settings/team/:id" component={EditTeam} />
      <Route exact path="/settings/alerts" component={Alerts} />
      <Route exact path="/settings/presets" component={Presets} />
      <Route exact path="/settings/" component={Settings} />
    </Switch>
  );
}

export default Index;

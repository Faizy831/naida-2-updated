import React from "react";
import { Switch, Route } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import NewProject from "./NewProject";
import ProjectDetails from "./ProjectDetails";
// import NewProject from "./NewClient";
// import ProjectDetails from "./ClientDetails";

function Index() {
  return (
    <Switch>
      <Route exact path="/projects/new" component={NewProject} />
      <Route exact path="/projects/:id" component={ProjectDetails} />
      <Route exact path="/projects" component={ProjectsList} />
    </Switch>
  );
}

export default Index;

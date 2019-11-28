import React from "react";
import { Switch, Route } from "react-router-dom";
import SuppliersList from "./SuppliersList";
import NewSupplier from "./NewSupplier";
import SupplierDetails from "./SupplierDetails";

function Index() {
  return (
    <Switch>
      <Route exact path="/suppliers/new" component={NewSupplier} />
      <Route exact path="/suppliers/:id" component={SupplierDetails} />
      <Route exact path="/suppliers" component={SuppliersList} />
    </Switch>
  );
}

export default Index;

import React from "react";
import { Switch, Route } from "react-router-dom";
import ExpensesList from "./ExpensesList";
import ExpensesDetails from "./ExpensesDetails";
import NewExpense from "./NewExpense";

function Index() {
  return (
    <Switch>
      <Route exact path="/expenses/new" component={NewExpense} />
      <Route exact path="/expenses/:id" component={ExpensesDetails} />
      <Route exact path="/expenses" component={ExpensesList} />
    </Switch>
  );
}

export default Index;

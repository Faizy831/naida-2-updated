import React from "react";
import { Spinner as Loading } from "reactstrap";
function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <Loading />
    </div>
  );
}

export default Spinner;

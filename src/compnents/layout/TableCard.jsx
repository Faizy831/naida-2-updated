import React from "react";
function TableCard({ children, className, ...rest }) {
  return (
    <div className={"table_card " + className} {...rest}>
      {children}
    </div>
  );
}

export default TableCard;

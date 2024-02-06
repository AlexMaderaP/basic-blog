import React from "react";

function FormGroup({ children, errorMessage }) {
  return (
    <div className={`form-group ${errorMessage && "error"}`}>
      {children}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default FormGroup;
